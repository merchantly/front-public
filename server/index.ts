/**
 * Bun SSR Server
 *
 * HTTP сервер для Server-Side Rendering React компонентов.
 * Заменяет mini_racer в Rails приложении.
 *
 * Endpoints:
 * - POST /render     - Рендеринг компонента (streaming)
 * - POST /render-batch - Batch рендеринг нескольких компонентов
 * - GET  /health     - Liveness probe
 * - GET  /ready      - Readiness probe
 * - GET  /metrics    - Prometheus metrics
 * - GET  /components - Список зарегистрированных компонентов
 */

// Polyfills должны быть импортированы ПЕРВЫМИ
import './polyfills';

import { config, validateConfig } from './config';
import { logger } from './utils/logger';
import { isCrawler, getCrawlerName } from './utils/crawlers';
import {
  renderComponent,
  renderBatch,
  loadComponentsFromBundle,
  getRegisteredComponents,
  ComponentNotFoundError,
  RenderError,
} from './renderer';
import { isComponentsLoaded, getLoadState } from './components';

// ============================================
// State
// ============================================

let isReady = false;
let isShuttingDown = false;
let activeRenders = 0;

// Metrics
const metrics = {
  renderTotal: 0,
  renderErrors: 0,
  renderDurationSum: 0,
};

// ============================================
// Configuration
// ============================================

const PORT = parseInt(process.env.PORT || '3001', 10);
const SSR_TIMEOUT = parseInt(process.env.SSR_TIMEOUT || '2000', 10);
const SSR_MAX_CONCURRENT = parseInt(process.env.SSR_MAX_CONCURRENT || '20', 10);

// ============================================
// Handlers
// ============================================

/**
 * Health check (liveness probe)
 */
function handleHealth(): Response {
  return Response.json({
    status: 'ok',
    uptime: process.uptime(),
    renders: {
      total: metrics.renderTotal,
      errors: metrics.renderErrors,
      avgDuration: metrics.renderTotal > 0 ? Math.round(metrics.renderDurationSum / metrics.renderTotal) : 0,
    },
  });
}

/**
 * Readiness check
 */
function handleReady(): Response {
  if (!isReady) {
    return new Response('Not ready', { status: 503 });
  }

  // Also check if components loaded successfully
  const loadState = getLoadState();
  if (loadState.status === 'error') {
    return Response.json(
      { status: 'error', message: `Components failed to load: ${loadState.message}` },
      { status: 503 }
    );
  }

  if (loadState.status !== 'loaded') {
    return new Response('Components not loaded', { status: 503 });
  }

  return Response.json({ status: 'ready', components: loadState.count });
}

/**
 * Prometheus metrics
 */
function handleMetrics(): Response {
  const metricsText = `
# HELP ssr_render_total Total number of render requests
# TYPE ssr_render_total counter
ssr_render_total ${metrics.renderTotal}

# HELP ssr_render_errors_total Total number of render errors
# TYPE ssr_render_errors_total counter
ssr_render_errors_total ${metrics.renderErrors}

# HELP ssr_render_duration_ms_sum Sum of render durations in milliseconds
# TYPE ssr_render_duration_ms_sum counter
ssr_render_duration_ms_sum ${metrics.renderDurationSum}

# HELP ssr_active_renders Current number of active renders
# TYPE ssr_active_renders gauge
ssr_active_renders ${activeRenders}

# HELP ssr_ready Whether the server is ready
# TYPE ssr_ready gauge
ssr_ready ${isReady ? 1 : 0}
`.trim();

  return new Response(metricsText, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

/**
 * Render single component with streaming support
 */
async function handleRender(req: Request): Promise<Response> {
  if (activeRenders >= SSR_MAX_CONCURRENT) {
    return new Response(
      JSON.stringify({ error: 'Server overloaded' }),
      { status: 503, headers: { 'Content-Type': 'application/json', 'Retry-After': '1' } }
    );
  }

  activeRenders++;
  metrics.renderTotal++;

  try {
    const body = await req.json();
    const { component, props, options } = body as {
      component: string;
      props: Record<string, unknown>;
      options?: { timeout?: number; waitForAll?: boolean };
    };

    if (!component) {
      activeRenders--;
      return Response.json({ error: 'Missing component name' }, { status: 400 });
    }

    const requestId = req.headers.get('X-Request-Id') || crypto.randomUUID();
    const userAgent = req.headers.get('User-Agent') || undefined;
    const timeout = options?.timeout || SSR_TIMEOUT;

    // Render component (streaming or full based on crawler detection)
    const result = await renderComponent(component, props || {}, {
      timeout,
      waitForAll: options?.waitForAll,
      userAgent,
      requestId,
    });

    metrics.renderDurationSum += result.duration;

    const headers: Record<string, string> = {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Request-Id': requestId,
      'X-SSR-Duration-Ms': String(Math.round(result.duration)),
      'X-SSR-Streaming': result.isStreaming ? 'true' : 'false',
    };

    if (result.isCrawler && result.crawlerName) {
      headers['X-SSR-Crawler'] = result.crawlerName;
    }

    if (result.isStreaming) {
      // Streaming response
      return new Response(result.html as ReadableStream, { headers });
    } else {
      // Full HTML string
      return new Response(result.html as string, { headers });
    }
  } catch (error) {
    metrics.renderErrors++;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Handle specific error types with appropriate status codes
    if (error instanceof ComponentNotFoundError) {
      logger.error('Component not found', {
        component: error.componentName,
        availableComponents: error.availableComponents.slice(0, 10),
      });
      return Response.json(
        {
          error: 'Component not found',
          component: error.componentName,
          message: error.message,
          availableComponents: error.availableComponents.slice(0, 10),
        },
        { status: 404 }
      );
    }

    if (error instanceof RenderError) {
      logger.error('Render error', {
        component: error.componentName,
        error: errorMessage,
        stack: errorStack,
      });
      return Response.json(
        {
          error: 'Render failed',
          component: error.componentName,
          message: errorMessage,
        },
        { status: 500 }
      );
    }

    // Generic error
    logger.error('Unexpected render error', { error: errorMessage, stack: errorStack });
    return Response.json(
      { error: 'Render failed', message: errorMessage },
      { status: 500 }
    );
  } finally {
    activeRenders--;
  }
}

/**
 * Batch render multiple components in parallel
 */
async function handleBatchRender(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { renders, options } = body as {
      renders: Array<{ id: string; component: string; props: Record<string, unknown> }>;
      options?: { timeout?: number };
    };

    if (!renders || !Array.isArray(renders)) {
      return Response.json({ error: 'Missing renders array' }, { status: 400 });
    }

    const start = performance.now();
    const requestId = req.headers.get('X-Request-Id') || crypto.randomUUID();
    const userAgent = req.headers.get('User-Agent') || undefined;

    const results = await renderBatch(renders, {
      timeout: options?.timeout || SSR_TIMEOUT,
      userAgent,
      requestId,
      waitForAll: true, // Batch always returns full HTML
    });

    // Transform results for response
    const responseResults = results.map((r) => ({
      id: r.id,
      html: r.html,
      duration_ms: Math.round(r.duration),
      error: r.error,
    }));

    // Count errors in results
    const errorCount = responseResults.filter(r => r.error).length;

    // Update metrics for batch errors
    if (errorCount > 0) {
      metrics.renderErrors += errorCount;
    }

    // Return 207 Multi-Status if some failed, 200 if all succeeded
    const status = errorCount === responseResults.length ? 500 :
                   errorCount > 0 ? 207 : 200;

    return Response.json({
      results: responseResults,
      total_duration_ms: Math.round(performance.now() - start),
      errors_count: errorCount,
    }, { status });
  } catch (error) {
    metrics.renderErrors++;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    logger.error('Batch render error', { error: errorMessage, stack: errorStack });
    return Response.json({ error: 'Batch render failed', message: errorMessage }, { status: 500 });
  }
}

/**
 * List registered components
 */
function handleComponents(): Response {
  const components = getRegisteredComponents();
  return Response.json({
    count: components.length,
    components,
  });
}

// ============================================
// Server
// ============================================

async function startServer() {
  // Validate configuration
  validateConfig();

  logger.info('Starting SSR server', {
    port: PORT,
    timeout: SSR_TIMEOUT,
    maxConcurrent: SSR_MAX_CONCURRENT,
    config: {
      assetHost: config.assetHost || '(not set)',
      thumborUrl: config.thumborUrl || '(not set)',
      maxItemsCount: config.maxItemsCount,
    },
  });

  // Load React components from bundle
  logger.info('Loading components from bundle...');
  loadComponentsFromBundle();
  logger.info('Components loaded', { count: getRegisteredComponents().length });

  // TODO: Preload translations (Фаза 2)
  // await preloadTranslations(['ru', 'en', 'uk', 'kk']);

  isReady = true;
  logger.info('Server is ready');

  const server = Bun.serve({
    port: PORT,

    async fetch(req) {
      const url = new URL(req.url);
      const method = req.method;

      // Shutdown check
      if (isShuttingDown && url.pathname !== '/health') {
        return new Response('Server is shutting down', { status: 503 });
      }

      // Routing
      if (method === 'GET') {
        switch (url.pathname) {
          case '/health':
            return handleHealth();
          case '/ready':
            return handleReady();
          case '/metrics':
            return handleMetrics();
          case '/components':
            return handleComponents();
        }
      }

      if (method === 'POST') {
        switch (url.pathname) {
          case '/render':
            return handleRender(req);
          case '/render-batch':
            return handleBatchRender(req);
        }
      }

      return new Response('Not Found', { status: 404 });
    },

    error(error) {
      logger.error('Server error', { error: error.message });
      return new Response('Internal Server Error', { status: 500 });
    },
  });

  logger.info(`SSR server listening on http://localhost:${PORT}`);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.info('SIGTERM received, starting graceful shutdown...');
    isShuttingDown = true;

    const maxWait = 30_000;
    const start = Date.now();

    while (activeRenders > 0 && Date.now() - start < maxWait) {
      await Bun.sleep(100);
    }

    if (activeRenders > 0) {
      logger.warn(`Force shutdown with ${activeRenders} active renders`);
    }

    server.stop();
    logger.info('Server stopped');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    logger.info('SIGINT received');
    process.emit('SIGTERM' as any);
  });
}

// Start
startServer().catch((error) => {
  logger.error('Failed to start server', { error: error.message });
  process.exit(1);
});
