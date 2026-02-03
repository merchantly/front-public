# SSR Server Configuration

Конфигурация SSR сервера через переменные окружения.

## Переменные окружения

| Переменная | Тип | Обязательно | По умолчанию | Описание |
|------------|-----|-------------|--------------|----------|
| `PORT` | number | нет | `3000` | Порт для HTTP сервера |
| `ASSET_HOST` | string | нет | `https://assets.kiiiosk.store` | CDN хост для статических ресурсов |
| `THUMBOR_URL` | string | нет | `https://thumbor.kiiiosk.store` | URL Thumbor сервера для обработки изображений |
| `MAX_ITEMS_COUNT` | number | нет | `100` | Максимальное количество товаров в корзине |
| `FALLBACK_PRODUCT_IMAGE` | string | нет | `https://assets.kiiiosk.store/images/fallback/product-none.png` | URL изображения-заглушки для товаров без фото |
| `LOG_LEVEL` | string | нет | `info` | Уровень логирования: `debug`, `info`, `warn`, `error` |

## Пример .env файла

```bash
# SSR Server
PORT=3000

# Assets (дефолты уже указывают на kiiiosk.store)
ASSET_HOST=https://assets.kiiiosk.store
THUMBOR_URL=https://thumbor.kiiiosk.store

# Limits
MAX_ITEMS_COUNT=100

# Fallbacks
FALLBACK_PRODUCT_IMAGE=https://assets.kiiiosk.store/images/fallback/product-none.png

# Logging
LOG_LEVEL=info
```

## Использование в коде

```typescript
import { config } from './config';

// Доступ к значениям
config.assetHost      // string
config.thumborUrl     // string
config.maxItemsCount  // number
config.fallbackProductImage // string
```

## Валидация

При старте сервера выводятся warnings если критичные переменные не заданы:

```
[WARN] Config validation warnings: THUMBOR_URL not set, image processing may not work
```

## Связь с legacy gon.*

| ENV переменная | Бывший gon.* | Использование |
|----------------|--------------|---------------|
| `ASSET_HOST` | `gon.asset_host` | Префикс для URL статики |
| `THUMBOR_URL` | `gon.thumbor_url` | Сервис обработки изображений |
| `MAX_ITEMS_COUNT` | `gon.max_items_count` | Лимит товаров в корзине |
| — | `gon.accounting_settings` | Теперь в `context.accountingSettings` от Rails |
| — | `gon.i18n.*` | Теперь в `context.translations` и `context.locale` |
