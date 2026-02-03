/**
 * SSR Test Setup
 *
 * Настройка окружения для тестирования SSR совместимости компонентов.
 * Этот файл должен импортироваться ПЕРВЫМ перед любыми компонентами.
 *
 * ВАЖНО: Мы НЕ удаляем window/document, потому что некоторые библиотеки
 * (spin.js) требуют их наличия при загрузке модулей.
 * Вместо этого мы копируем подход из test_prerender.js.
 */

// Устанавливаем gon с тестовыми данными
global.gon = {
  asset_host: 'test-cdn.example.com',
  thumbor_url: 'https://thumbor.example.com',
  max_items_count: 100,
  i18n: {
    locale: 'ru',
    translations: {
      'vendor.cart.amount': 'Количество',
      'vendor.cart.weight': 'Вес',
      'vendor.cart.not_available': 'Недоступно',
    },
  },
  __data: {
    design: {
      activeElementsColor: '#000000',
      mainPageProductsInRow: 2,
      mainPageRows: 5,
    },
  },
};

// Мок для Redux store
global.redux = {
  getState: () => ({
    clientState: { data: { sortedCart: false } },
    design: { current: {} },
    cart: { data: { items: [] } },
  }),
  dispatch: () => {},
  subscribe: () => () => {},
};

// Экспортируем helper функции для тестов
module.exports = {
  /**
   * Сбросить gon к значениям по умолчанию
   */
  resetGon() {
    global.gon = {
      asset_host: 'test-cdn.example.com',
      thumbor_url: 'https://thumbor.example.com',
      max_items_count: 100,
      i18n: { locale: 'ru', translations: {} },
      __data: { design: {} },
    };
  },

  /**
   * Установить конкретные значения в gon
   */
  setGon(values) {
    Object.assign(global.gon, values);
  },
};
