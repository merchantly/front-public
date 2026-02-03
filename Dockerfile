# ===========================================
# Dockerfile для SSR сервера на Bun
# ===========================================
# Целевой размер образа: ~50-60 MB
#
# Сборка:
#   docker build -t ssr-server .
#
# Запуск:
#   docker run -p 3001:3001 \
#     -e ASSET_HOST=cdn.example.com \
#     -e THUMBOR_URL=https://thumbor.example.com \
#     ssr-server
# ===========================================

# Stage 1: Dependencies
FROM oven/bun:1.1-alpine AS deps

WORKDIR /app

# Копируем package.json сервера (минимальные зависимости)
COPY server/package.json ./

# Устанавливаем зависимости
RUN bun install --production

# Stage 2: Build
FROM oven/bun:1.1-alpine AS builder

WORKDIR /app

# Копируем зависимости из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules
COPY server/package.json ./

# Копируем исходники сервера
COPY server ./server

# Копируем собранные бандлы (нужны для SSR рендеринга компонентов)
COPY dist/store_app_prerender.production.js ./dist/
COPY dist/store_app_prerender.development.js ./dist/

# TypeScript проверяется в CI, Bun запускает .ts напрямую

# Stage 3: Production
FROM oven/bun:1.1-alpine AS production

WORKDIR /app

# Создаём непривилегированного пользователя
RUN addgroup -g 1001 -S nodejs && \
    adduser -S ssr -u 1001 -G nodejs

# Копируем только необходимое для запуска
COPY --from=builder --chown=ssr:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=ssr:nodejs /app/server ./server
COPY --from=builder --chown=ssr:nodejs /app/dist ./dist
COPY --from=builder --chown=ssr:nodejs /app/package.json ./

# Переключаемся на непривилегированного пользователя
USER ssr

# Переменные окружения по умолчанию
ENV NODE_ENV=production \
    PORT=3001 \
    SSR_TIMEOUT=2000 \
    SSR_MAX_CONCURRENT=20 \
    LOG_LEVEL=info

# Порт
EXPOSE 3001

# Health check
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Запуск
CMD ["bun", "run", "server/index.ts"]
