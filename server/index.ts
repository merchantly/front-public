/**
 * Bun SSR Server
 *
 * HTTP сервер для Server-Side Rendering React компонентов.
 * Заменяет mini_racer в Rails приложении.
 *
 * Endpoints:
 * - POST /render     - Рендеринг компонента
 * - POST /render-batch - Batch рендеринг нескольких компонентов
 * - GET  /health     - Liveness probe
 * - GET  /ready      - Readiness probe
 * - GET  /metrics    - Prometheus metrics
 */

// Polyfills должны быть импортированы ПЕРВЫМИ
import './polyfills';

import { config, validateConfig } from './config';
import { logger } from './utils/logger';

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
  return Response.json({ status: 'ready' });
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
 * Render single component (placeholder - будет реализовано в следующих фазах)
 */
async function handleRender(req: Request): Promise<Response> {
  if (activeRenders >= SSR_MAX_CONCURRENT) {
    return new Response(
      JSON.stringify({ error: 'Server overloaded' }),
      { status: 503, headers: { 'Content-Type': 'application/json', 'Retry-After': '1' } }
    );
  }

  const start = performance.now();
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
      return Response.json({ error: 'Missing component name' }, { status: 400 });
    }

    const requestId = req.headers.get('X-Request-Id') || crypto.randomUUID();
    const _timeout = options?.timeout || SSR_TIMEOUT;

    logger.info('Render request', { component, requestId, propsKeys: Object.keys(props || {}), timeout: _timeout });

    // TODO: Реализовать реальный рендеринг в Фазе 2
    // Пока возвращаем placeholder
    const html = `<div data-react-class="${component}" data-react-props="${escapeHtml(JSON.stringify(props || {}))}" data-ssr-placeholder="true"></div>`;

    const duration = performance.now() - start;
    metrics.renderDurationSum += duration;

    logger.info('Render completed', { component, requestId, duration_ms: Math.round(duration) });

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Request-Id': requestId,
        'X-SSR-Duration-Ms': String(Math.round(duration)),
      },
    });
  } catch (error) {
    metrics.renderErrors++;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    logger.error('Render error', { error: errorMessage });

    return Response.json(
      { error: 'Render failed', message: errorMessage },
      { status: 500 }
    );
  } finally {
    activeRenders--;
  }
}

/**
 * Batch render (placeholder)
 */
async function handleBatchRender(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const { renders } = body as {
      renders: Array<{ id: string; component: string; props: Record<string, unknown> }>;
    };

    if (!renders || !Array.isArray(renders)) {
      return Response.json({ error: 'Missing renders array' }, { status: 400 });
    }

    const start = performance.now();

    // TODO: Реализовать параллельный рендеринг
    const results = renders.map(({ id, component, props }) => ({
      id,
      html: `<div data-react-class="${component}" data-react-props="${escapeHtml(JSON.stringify(props || {}))}" data-ssr-placeholder="true"></div>`,
      duration_ms: 0,
    }));

    return Response.json({
      results,
      total_duration_ms: Math.round(performance.now() - start),
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: 'Batch render failed', message: errorMessage }, { status: 500 });
  }
}

// ============================================
// Utilities
// ============================================

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
