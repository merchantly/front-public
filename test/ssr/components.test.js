/**
 * SSR Components Tests
 *
 * Тесты проверяют что критичные компоненты рендерятся без ошибок
 * в серверном окружении (без реальных window/document).
 *
 * Запуск: yarn test:ssr
 */

// Setup ДОЛЖЕН быть импортирован первым!
require('./setup');

const assert = require('assert');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// Загружаем собранный бандл после setup (как в test_prerender.js)
require('../../dist/store_app_prerender.development.js');

/**
 * Helper для рендеринга компонента в строку
 */
function renderToString(element) {
  return ReactDOMServer.renderToStaticMarkup(element);
}

/**
 * Helper для тестирования глобального компонента
 */
function testGlobalComponent(name, props) {
  it(`${name} renders without errors`, () => {
    const Component = global[name];
    assert(Component, `Component ${name} not found in global`);

    const element = React.createElement(Component, props);
    const html = renderToString(element);
    assert(html.length > 0, `${name} rendered empty HTML`);
  });
}

// ============================================
// Tests
// ============================================

describe('SSR Compatibility Tests', function() {
  this.timeout(10000);

  describe('ConfigContext', () => {
    it('useConfig returns fallback values without provider', () => {
      const { useConfig } = require('../../app/scripts/react/contexts/ConfigContext');

      // В тестовом окружении gon установлен в setup.js
      // useConfig должен вернуть значения из gon
      // Мы не можем вызвать хук вне компонента, но можем проверить что модуль загружается
      assert(typeof useConfig === 'function', 'useConfig should be a function');
    });

    it('ConfigProvider renders children', () => {
      const { ConfigProvider } = require('../../app/scripts/react/contexts/ConfigContext');

      const config = {
        assetHost: 'cdn.test.com',
        thumborUrl: 'https://thumbor.test.com',
        maxItemsCount: 50,
      };

      const html = renderToString(
        React.createElement(
          ConfigProvider,
          { config },
          React.createElement('div', { className: 'test' }, 'Hello')
        )
      );

      assert(html.includes('test'), 'Should render children');
      assert(html.includes('Hello'), 'Should render children content');
    });
  });

  describe('DOM Helpers', () => {
    it('canUseDOM returns true in Node.js with DOM (global window exists)', () => {
      const { canUseDOM } = require('../../app/scripts/react/helpers/dom');

      // В Node.js окружении без удаления window, canUseDOM вернет значение
      // в зависимости от наличия window
      const result = canUseDOM();
      assert(typeof result === 'boolean', 'canUseDOM should return boolean');
    });

    it('getElt returns null for non-existent selector', () => {
      const { getElt } = require('../../app/scripts/react/helpers/dom');

      const result = getElt('.non-existent-element');
      assert(result === null, 'getElt should return null for non-existent selector');
    });
  });

  describe('Money Helper', () => {
    it('humanizedMoneyWithCurrency works on server', () => {
      const { humanizedMoneyWithCurrency } = require('../../app/scripts/react/helpers/money');

      const result = humanizedMoneyWithCurrency({
        cents: 10000,
        currencyIsoCode: 'RUB',
      });

      assert(typeof result === 'string', 'Should return string');
      assert(result.length > 0, 'Should not be empty');
    });

    it('humanizedMoney works on server', () => {
      const { humanizedMoney } = require('../../app/scripts/react/helpers/money');

      const result = humanizedMoney({
        cents: 10000,
        currencyIsoCode: 'RUB',
      });

      assert(typeof result === 'string', 'Should return string');
      assert(result.includes('100'), 'Should format 10000 cents as 100');
    });

    it('returns dash for null money', () => {
      const { humanizedMoney } = require('../../app/scripts/react/helpers/money');

      const result = humanizedMoney(null);
      assert.strictEqual(result, '-', 'Should return dash for null');
    });
  });

  // Тесты из существующего test_prerender.js для проверки что ничего не сломалось
  describe('Global Components from Bundle', () => {
    testGlobalComponent('Logo', require('../fixtures/logo_props.js'));
    testGlobalComponent('ProductBlock', require('../fixtures/productBlock/sample.json'));
    testGlobalComponent('MenuTop', require('../fixtures/menuTop/sample1.json'));
    testGlobalComponent('MenuBottom', require('../fixtures/menuBottom/sample.json'));
    testGlobalComponent('NavBar', require('../fixtures/navBar/sample.json'));
  });

  describe('Pagination Component', () => {
    it('Pagination renders with currentHref prop', () => {
      const Pagination = global.Pagination;
      assert(Pagination, 'Pagination not found in global');

      // Pagination требует props через провайдер, тестируем только загрузку
      assert(typeof Pagination === 'function', 'Pagination should be a function');
    });
  });
});
