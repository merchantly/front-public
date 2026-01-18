# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Обзор проекта

MerchantlyFrontApp — фронтенд приложение для платформы Merchantly (e-commerce). Построено на React 16.2 с Redux для управления состоянием. Поддерживает серверный рендеринг через MiniRacer (Ruby).

## Команды разработки

```bash
# Установка всех зависимостей (Node + Ruby + Chrome)
make deps

# Или по отдельности
yarn install         # Node зависимости
bundle install       # Ruby зависимости (MiniRacer)

# Разработка с Storybook
yarn storybook

# Сборка для production и development
yarn build

# Только production сборка
yarn build:production

# Только development сборка
yarn build:development

# Запуск тестов (рекомендуется)
yarn test:prerender    # Основной тест — 50 компонентов
yarn test:ssr          # Тест SSR совместимости
yarn test:mini_racer   # Тест совместимости с MiniRacer

# Браузерные тесты через Playwright (138 тестов)
yarn test:browser        # Headless режим
yarn test:browser:headed # С видимым браузером
yarn test:browser:debug  # Режим отладки

# Анализ бандла
yarn profile

# Деплой Storybook на gh-pages
yarn deploy-storybook
```

## Архитектура

### Структура app/scripts/

- `bundle.js` — главная точка входа, экспортирует React-компоненты в глобальный объект
- `store_app.js` — точка входа для браузера (полифиллы, стили, Bugsnag)
- `store_app_prerender.js` — точка входа для серверного рендеринга (MiniRacer)
- `widget.js` — встраиваемый виджет

### React приложение (app/scripts/react/)

```
react/
├── actions/       # Redux actions
├── api/           # API-клиент (Requester.js)
├── components/    # React компоненты (~58 директорий)
├── constants/     # Redux константы
├── entities/      # Сущности данных
├── helpers/       # Вспомогательные функции
├── middleware/    # Redux middleware (api.js — CALL_API)
├── models/        # Модели данных
├── reducers/      # Redux reducers
├── schemas/       # Схемы данных
├── services/      # Сервисы (Notice, etc.)
└── utils/         # Утилиты
```

### Redux Store

Глобальный store доступен через `global.redux`. Reducers:
- `cart` — корзина
- `clientState` — состояние клиента
- `operatorState` — состояние оператора
- `design` — настройки дизайна
- `packages` — пакеты товаров
- `goodState` — состояние товара
- `layout` — layout страницы
- `wishlist` — список желаний
- `popup` — модальные окна

### Паттерн компонентов

Каждый компонент обычно содержит:
- `ComponentName.jsx` — основной компонент
- `ComponentNamePage.jsx` — Page-обёртка для серверного рендеринга
- `index.jsx` — экспорт

Компоненты экспортируются в `global` объект в `bundle.js` и рендерятся через `react_ujs`.

### Алиасы путей (Babel)

```javascript
"scripts"  → "./app/scripts"
"r"        → "./app/scripts/react"
"rc"       → "./app/scripts/react/components"
"test"     → "./test"
"styles"   → "./app/stylesheets"
```

## Тестирование

- Фреймворк: Mocha + Chai
- React тестирование: Enzyme с адаптером для React 18
- Браузерные тесты: Playwright (запускает Mocha в браузере)
- Фикстуры: `test/fixtures/` — JSON данные для компонентов
- Тесты компонентов: `test/react/components/`

**Важно:** Enzyme `mount()` несовместим с React 18 concurrent mode. Используйте `shallow()` или `render()` для тестов компонентов.

Структура теста:
```javascript
import { expect } from 'chai';
import { shallow } from 'enzyme';
import t from 'test/mocks/t';
import Component from 'rc/ComponentName';
import fixture from 'test/fixtures/componentName/sample.json';
```

## Особенности

### Серверный рендеринг

Приложение поддерживает SSR через Ruby MiniRacer. Сборка `store_app_prerender.js` не включает браузерные зависимости (reqwest заменён на noop).

### Глобальные объекты

- `gon` — данные с сервера (i18n, env, __data)
- `global.redux` — Redux store
- `global.Kiosk` — информация о версии
- `global.*` — React компоненты для react_ujs

### i18n

Используется i18next. Локали в `app/scripts/locales/`.

### ESLint

Конфигурация: Airbnb стиль, max-len: 150, semi: always.

## Webpack

Три конфигурации сборки:
1. `browserConfig` — основной бандл для браузера
2. `testsConfig` — тестовый бандл
3. `nodeConfig` — бандл для серверного рендеринга (target: node)

Entry points:
- `widget` — встраиваемый виджет
- `store_app` — основное приложение
- `store_app_styles` — стили
- `libs` — вендорные библиотеки
