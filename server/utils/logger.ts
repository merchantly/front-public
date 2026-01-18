/**
 * SSR Server Logger
 *
 * Структурированное логирование в JSON формате для Fluentd/Loki.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMeta {
  [key: string]: unknown;
}

const LOG_LEVEL = (process.env.LOG_LEVEL || 'info') as LogLevel;

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[LOG_LEVEL];
}

function formatLog(level: LogLevel, msg: string, meta?: LogMeta): string {
  return JSON.stringify({
    level,
    msg,
    ...meta,
    timestamp: new Date().toISOString(),
    service: 'ssr-server',
  });
}

export const logger = {
  debug(msg: string, meta?: LogMeta): void {
    if (shouldLog('debug')) {
      console.debug(formatLog('debug', msg, meta));
    }
  },

  info(msg: string, meta?: LogMeta): void {
    if (shouldLog('info')) {
      console.log(formatLog('info', msg, meta));
    }
  },

  warn(msg: string, meta?: LogMeta): void {
    if (shouldLog('warn')) {
      console.warn(formatLog('warn', msg, meta));
    }
  },

  error(msg: string, meta?: LogMeta): void {
    if (shouldLog('error')) {
      console.error(formatLog('error', msg, meta));
    }
  },
};
