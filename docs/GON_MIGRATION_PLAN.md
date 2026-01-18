# План миграции от gon

## Цель

Полный уход от глобального объекта `gon` с сохранением обратной совместимости на каждом этапе.

## Текущее состояние

### Источники данных (новый формат)
- `<script id="__SSR_CONFIG__">` — JSON с конфигурацией
- `window.__TRANSLATIONS__` — объект переводов
- `<meta name="...">` — отдельные значения (app-env, access-token, csrf-token)

### Использование gon в кодовой базе

| Файл | Данные из gon | Новый источник |
|------|---------------|----------------|
| `libsConfigs.js:24-26` | `gon.i18n.locale`, `gon.i18n.translations` | `__SSR_CONFIG__.locale`, `__TRANSLATIONS__` |
| `provideTranslations.jsx:47-62` | `gon.i18n.locale`, `gon.i18n.translations` | `__SSR_CONFIG__.locale`, `__TRANSLATIONS__` |
| `money.js:12-16` | `gon.i18n.locale` | `__SSR_CONFIG__.locale` |
| `application.js:27-28` | `gon.__data.design` | `__SSR_CONFIG__.vendor.design` |
| `routes/api.js:2,6` | `gon.public_api_url`, `gon.operator_api_url` | `__SSR_CONFIG__.vendor.public_api_url`, `__SSR_CONFIG__.vendor.operator_api_url` |
| `Thumbor.js:64,69` | `gon.thumbor_url` | `__SSR_CONFIG__.thumborUrl` |
| `libs.js:64-65` | `gon.accounting_settings` | `__SSR_CONFIG__.accountingSettings` |
| `ConfigContext.jsx` | весь `getGonConfig()` | `getSsrConfig()` |

---

## Фазы миграции

### Фаза 1: Подготовка инфраструктуры ✅ (выполнено в PR #282)

- [x] Создать `server/types/context.ts` с типами `SsrContext`, `AppConfig`
- [x] Обновить SSR Server для приёма `context` в API
- [x] Создать `ConfigProvider` и хуки (`useConfig`, `useVendor`, `useLocale`, etc.)
- [x] Добавить поддержку `__SSR_CONFIG__` + `__TRANSLATIONS__` в клиентском `ConfigContext.jsx`
- [x] Мигрировать `store_app.js` на meta-тег `app-env`
- [x] Мигрировать `csrfToken.js` на meta-тег `access-token`
- [x] Добавить fallback на `__SSR_CONFIG__` в `libs.js`

### Фаза 2: Унификация i18n (locale + translations)

**Цель:** Единый источник для locale и translations.

#### 2.1 Создать хелпер `getI18nConfig()`

```javascript
// app/scripts/react/helpers/i18nConfig.js

/**
 * Получить locale и translations из доступных источников
 * Приоритет: __SSR_CONFIG__ → gon → defaults
 */
export function getI18nConfig() {
  // 1. Новый формат: __SSR_CONFIG__ + __TRANSLATIONS__
  if (typeof document !== 'undefined') {
    const configScript = document.getElementById('__SSR_CONFIG__');
    if (configScript) {
      try {
        const config = JSON.parse(configScript.textContent || '{}');
        return {
          locale: config.locale || 'ru',
          translations: window.__TRANSLATIONS__ || {},
        };
      } catch (e) {
        // fallback
      }
    }
  }

  // 2. Legacy: gon
  if (typeof gon !== 'undefined' && gon.i18n) {
    return {
      locale: gon.i18n.locale || 'ru',
      translations: gon.i18n.translations || {},
    };
  }

  // 3. Defaults
  return { locale: 'ru', translations: {} };
}

export function getLocale() {
  return getI18nConfig().locale;
}

export function getTranslations() {
  return getI18nConfig().translations;
}
```

#### 2.2 Мигрировать файлы

| Файл | Изменение |
|------|-----------|
| `libsConfigs.js` | Использовать `getI18nConfig()` |
| `provideTranslations.jsx` | Использовать `getLocale()`, `getTranslations()` |
| `money.js` | Использовать `getLocale()` |

### Фаза 3: Унификация vendor/API URLs

**Цель:** Единый источник для API URLs и vendor данных.

#### 3.1 Создать хелпер `getVendorConfig()`

```javascript
// app/scripts/react/helpers/vendorConfig.js

export function getVendorConfig() {
  // 1. __SSR_CONFIG__
  if (typeof document !== 'undefined') {
    const configScript = document.getElementById('__SSR_CONFIG__');
    if (configScript) {
      try {
        const config = JSON.parse(configScript.textContent || '{}');
        if (config.vendor) {
          return config.vendor;
        }
      } catch (e) {}
    }
  }

  // 2. gon fallback
  if (typeof gon !== 'undefined') {
    return {
      id: 0,
      root_url: '',
      public_api_url: gon.public_api_url || '',
      operator_api_url: gon.operator_api_url || '',
      design: (gon.__data && gon.__data.design) || {},
    };
  }

  return { id: 0, root_url: '', public_api_url: '', operator_api_url: '', design: {} };
}
```

#### 3.2 Мигрировать файлы

| Файл | Изменение |
|------|-----------|
| `routes/api.js` | Использовать `getVendorConfig()` |
| `application.js` | Использовать `getVendorConfig().design` |

### Фаза 4: Унификация серверных настроек

**Цель:** Единый источник для thumborUrl, assetHost, maxItemsCount.

#### 4.1 Создать хелпер `getServerConfig()`

```javascript
// app/scripts/react/helpers/serverConfig.js

export function getServerConfig() {
  // 1. __SSR_CONFIG__
  if (typeof document !== 'undefined') {
    const configScript = document.getElementById('__SSR_CONFIG__');
    if (configScript) {
      try {
        const config = JSON.parse(configScript.textContent || '{}');
        return {
          assetHost: config.assetHost || '',
          thumborUrl: config.thumborUrl || '',
          maxItemsCount: config.maxItemsCount || 100,
          fallbackProductImage: config.fallbackProductImage || '',
        };
      } catch (e) {}
    }
  }

  // 2. gon fallback
  if (typeof gon !== 'undefined') {
    return {
      assetHost: gon.asset_host || '',
      thumborUrl: gon.thumbor_url || '',
      maxItemsCount: gon.max_items_count || 100,
      fallbackProductImage: '',
    };
  }

  return { assetHost: '', thumborUrl: '', maxItemsCount: 100, fallbackProductImage: '' };
}
```

#### 4.2 Мигрировать файлы

| Файл | Изменение |
|------|-----------|
| `Thumbor.js` | Использовать `getServerConfig().thumborUrl` |

### Фаза 5: Обновление Rails бэкенда

**Цель:** Бэкенд выводит `__SSR_CONFIG__` вместо `gon`.

```erb
<%# app/views/layouts/_ssr_config.html.erb %>

<script id="__SSR_CONFIG__" type="application/json">
  <%= raw({
    vendor: {
      id: @vendor&.id,
      root_url: @vendor&.root_url,
      public_api_url: public_api_url,
      operator_api_url: operator_api_url,
      design: @design,
    },
    locale: I18n.locale,
    currency: {
      symbol: @currency&.symbol || '₽',
      format: '%v %s',
      decimal: ',',
      thousand: ' ',
      precision: 0,
    },
    accountingSettings: accounting_settings,
    assetHost: asset_host,
    thumborUrl: thumbor_url,
    maxItemsCount: max_items_count,
    fallbackProductImage: fallback_product_image,
  }.to_json) %>
</script>

<script>
  window.__TRANSLATIONS__ = <%= raw I18n.backend.translations[I18n.locale].to_json %>;
</script>

<meta name="app-env" content="<%= Rails.env %>">
<meta name="access-token" content="<%= @access_token %>">
```

### Фаза 6: Удаление fallback на gon

**Цель:** Полное удаление зависимости от `gon`.

После того как бэкенд обновлён и все страницы выводят `__SSR_CONFIG__`:

1. Удалить `getGonConfig()` из `ConfigContext.jsx`
2. Удалить fallback на `gon` из всех хелперов
3. Удалить `gon` из тестовых моков
4. Удалить `gon` из `store_app_prerender.js` (если используется)

### Фаза 7: Cleanup

1. Удалить поле `currency` из `ConfigContext` (дублирует `accountingSettings.currency`)
2. Удалить неиспользуемые хелперы
3. Обновить документацию

---

## Структура __SSR_CONFIG__

```typescript
interface SsrConfig {
  vendor: {
    id: number;
    root_url: string;
    public_api_url: string;
    operator_api_url: string;
    design: Record<string, unknown>;
  };
  locale: string;
  // currency и numberSettings на верхнем уровне (не вложены в accountingSettings)
  currency: {
    symbol: string;      // Символ валюты (₽, $, €)
    format: string;      // Формат: '%v %s' = "100 ₽"
    decimal: string;     // Десятичный разделитель
    thousand: string;    // Разделитель тысяч
    precision: number;   // Знаков после запятой
  };
  numberSettings: {
    precision: number;
    thousand: string;
    decimal: string;
  };
  assetHost: string;
  thumborUrl: string;
  maxItemsCount: number;
  fallbackProductImage: string;
}

// accounting.js настройки формируются из currency + numberSettings:
// { currency: config.currency, number: config.numberSettings }
```

---

## Чеклист для каждой фазы

- [ ] Написать код с fallback на gon
- [ ] Написать тесты
- [ ] Проверить SSR рендеринг
- [ ] Проверить клиентскую гидрацию
- [ ] Создать PR
- [ ] Merge после ревью

---

## Риски и митигация

| Риск | Митигация |
|------|-----------|
| Сломается клиент до обновления бэкенда | Fallback на gon на каждом этапе |
| SSR и CSR показывают разные данные | Единые хелперы для обоих режимов |
| Забыли место с gon | Grep по `gon\.` перед удалением fallback |
| Тесты падают | Обновить моки `test/mocks/gon.js` |

---

## Оценка трудозатрат

| Фаза | Сложность | Зависимости |
|------|-----------|-------------|
| 2. i18n | Низкая | — |
| 3. vendor/API | Низкая | — |
| 4. server config | Низкая | — |
| 5. Rails бэкенд | Средняя | Rails app |
| 6. Удаление fallback | Низкая | Фаза 5 |
| 7. Cleanup | Низкая | Фаза 6 |
