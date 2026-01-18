/**
 * Bun SSR Server
 *
 * HTTP сервер для Server-Side Rendering React компонентов.
 * Заменяет mini_racer в Rails приложении.
 *
 * Endpoints:
 * - POST /render     - Рендеринг компонента (streaming)
 * - GET  /health     - Liveness probe
 * - GET  /ready      - Readiness probe
 * - GET  /metrics    - Prometheus metrics
 * - GET  /components - Список зарегистрированных компонентов
 */

// Polyfills должны быть импортированы ПЕРВЫМИ
import './polyfills';

import { config, validateConfig } from './config';
import { logger } from './utils/logger';
import {
  renderComponent,
  loadComponentsFromBundle,
  getRegisteredComponents,
  ComponentNotFoundError,
  RenderError,
} from './renderer';
import { isComponentsLoaded, getLoadState } from './components';
import type { SsrContext } from './types/context';
import { z } from 'zod';

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
const MAX_REQUEST_SIZE = parseInt(process.env.SSR_MAX_REQUEST_SIZE || '10485760', 10); // 10MB
const MAX_PROPS_SIZE = parseInt(process.env.SSR_MAX_PROPS_SIZE || '1048576', 10); // 1MB

// ============================================
// Validation Helpers
// ============================================

/**
 * Validates component name format.
 * Must start with uppercase letter and contain only alphanumeric chars.
 */
function isValidComponentName(name: unknown): name is string {
  return (
    typeof name === 'string' &&
    name.length > 0 &&
    name.length <= 200 &&
    /^[A-Z][A-Za-z0-9_]*$/.test(name)
  );
}

/**
 * Checks Content-Length header against limit.
 * Returns error response if too large, null if OK.
 */
function checkRequestSize(req: Request, maxSize: number): Response | null {
  const contentLength = req.headers.get('Content-Length');
  if (contentLength && parseInt(contentLength, 10) > maxSize) {
    return Response.json(
      { error: 'Request body too large', maxSize },
      { status: 413 }
    );
  }
  return null;
}

/**
 * Validates props object - checks for size and circular references.
 */
function validateProps(props: unknown): { valid: boolean; error?: string } {
  if (props === null || props === undefined) {
    return { valid: true };
  }

  if (typeof props !== 'object') {
    return { valid: false, error: 'Props must be an object' };
  }

  try {
    const propsStr = JSON.stringify(props);
    if (propsStr.length > MAX_PROPS_SIZE) {
      return { valid: false, error: `Props too large (${propsStr.length} bytes, max ${MAX_PROPS_SIZE})` };
    }
    return { valid: true };
  } catch (error) {
    // Log the actual error for debugging (could be circular ref, BigInt, or other serialization issues)
    const errorMessage = error instanceof Error ? error.message : 'Unknown serialization error';
    logger.warn('Props serialization failed', { error: errorMessage });
    return { valid: false, error: `Props serialization failed: ${errorMessage}` };
  }
}

/**
 * Zod schema for SSR context validation.
 * Matches the contract in BrandyMint/merchantly#4227
 */
const SsrContextSchema = z.object({
  vendor: z.object({
    public_api_url: z.string().url(),
    operator_api_url: z.string().url(),
  }),
  locale: z.string().min(2).max(5),
  currency: z.object({
    symbol: z.string().min(1),
    format: z.string().min(1),
    decimal: z.string(),
    thousand: z.string(),
    precision: z.number().int().nonnegative(),
  }),
  numberSettings: z.object({
    precision: z.number().int().nonnegative(),
    thousand: z.string(),
    decimal: z.string(),
  }),
  design: z.object({
    logoUrl: z.string().url().nullable().optional(),
  }).optional(),
});

/**
 * Validates SSR context object using Zod schema.
 * Returns all validation errors with paths for better debugging.
 */
function validateContext(context: unknown): { valid: boolean; error?: string } {
  const result = SsrContextSchema.safeParse(context);
  if (!result.success) {
    // Собираем ВСЕ ошибки с путями к полям
    const errors = result.error.issues.map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
      return `${path}: ${issue.message}`;
    });

    logger.warn('Context validation failed', {
      errors,
      receivedKeys: context && typeof context === 'object' ? Object.keys(context) : 'not an object',
    });

    return { valid: false, error: errors.join('; ') };
  }
  return { valid: true };
}

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
  // Check request size before parsing
  const sizeError = checkRequestSize(req, MAX_REQUEST_SIZE);
  if (sizeError) return sizeError;

  if (activeRenders >= SSR_MAX_CONCURRENT) {
    return new Response(
      JSON.stringify({ error: 'Server overloaded' }),
      { status: 503, headers: { 'Content-Type': 'application/json', 'Retry-After': '1' } }
    );
  }

  // Extract request ID early for logging context
  const requestId = req.headers.get('X-Request-Id') || crypto.randomUUID();

  // Parse JSON body first, before incrementing metrics
  let body: {
    component: string;
    props: Record<string, unknown>;
    context: SsrContext;
    options?: { timeout?: number; waitForAll?: boolean };
  };
  try {
    body = await req.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
    logger.warn('Invalid JSON in request body', { error: errorMessage, requestId });
    return Response.json(
      { error: 'Invalid JSON', message: errorMessage },
      { status: 400 }
    );
  }

  const { component, props, context, options } = body;

  // Validate component name format (before incrementing metrics)
  if (!isValidComponentName(component)) {
    return Response.json(
      { error: 'Invalid component name', message: 'Component name must start with uppercase letter and contain only alphanumeric characters' },
      { status: 400 }
    );
  }

  // Validate props (before incrementing metrics)
  const propsValidation = validateProps(props);
  if (!propsValidation.valid) {
    return Response.json({ error: 'Invalid props', message: propsValidation.error }, { status: 400 });
  }

  // Validate context (before incrementing metrics)
  const contextValidation = validateContext(context);
  if (!contextValidation.valid) {
    return Response.json({ error: 'Invalid context', message: contextValidation.error }, { status: 400 });
  }

  // Increment metrics only for valid requests
  activeRenders++;
  metrics.renderTotal++;

  try {
    const userAgent = req.headers.get('User-Agent') || undefined;
    const timeout = options?.timeout || SSR_TIMEOUT;

    // Render component with context (streaming or full based on crawler detection)
    const result = await renderComponent(component, props || {}, context, {
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
        if (url.pathname === '/render') {
          return handleRender(req);
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
