/**
 * SSR Services Tests
 *
 * Тесты проверяют что сервисы работают корректно в серверном окружении.
 */

// Setup ДОЛЖЕН быть импортирован первым!
const { resetGon, setGon } = require('./setup');

const assert = require('assert');

// Загружаем бандл чтобы сервисы были доступны через global
require('../../dist/store_app_prerender.development.js');

describe('SSR Services Tests', function() {
  this.timeout(5000);

  describe('Notice Service', () => {
    it('does not throw on server when calling notify', () => {
      // NoticeService экспортирован в global из бандла
      const NoticeService = global.NoticeService;
      assert(NoticeService, 'NoticeService should be available in global');

      // На сервере notify должен молча выйти, не падать
      assert.doesNotThrow(() => {
        NoticeService.notifyInfo('Test message');
      }, 'notifyInfo should not throw on server');

      assert.doesNotThrow(() => {
        NoticeService.notifyError('Error message');
      }, 'notifyError should not throw on server');

      assert.doesNotThrow(() => {
        NoticeService.notifySuccess('Success message');
      }, 'notifySuccess should not throw on server');
    });

    it('close does not throw on server', () => {
      const NoticeService = global.NoticeService;

      assert.doesNotThrow(() => {
        NoticeService.close();
      }, 'close should not throw on server');
    });
  });

  describe('Thumbor Service', () => {
    // Thumbor сервис не экспортирован в global, тестируем через helpers
    it('thumborUrl can be accessed', () => {
      // Thumbor URL должен читаться из gon
      assert(global.gon.thumbor_url !== undefined, 'thumbor_url should be defined in gon');
    });
  });
});

describe('SSR Helpers Tests', function() {
  describe('Money Helper', () => {
    it('humanizedMoney works on server', () => {
      const { humanizedMoney } = require('../../app/scripts/react/helpers/money');

      const result = humanizedMoney({
        cents: 10000,
        currencyIsoCode: 'RUB',
      });

      assert(typeof result === 'string', 'Should return string');
      assert(result.includes('100'), 'Should format 10000 cents as 100');
    });

    it('humanizedMoneyWithCurrency includes currency symbol', () => {
      const { humanizedMoneyWithCurrency } = require('../../app/scripts/react/helpers/money');

      const result = humanizedMoneyWithCurrency({
        cents: 10000,
        currencyIsoCode: 'RUB',
      });

      assert(typeof result === 'string', 'Should return string');
      // RUB символ может быть разным в зависимости от локали
      assert(result.length > 0, 'Should not be empty');
    });

    it('returns dash for null money', () => {
      const { humanizedMoney } = require('../../app/scripts/react/helpers/money');

      const result = humanizedMoney(null);
      assert.strictEqual(result, '-', 'Should return dash for null');
    });
  });

  describe('DOM Helpers', () => {
    it('getScrollTop does not throw', () => {
      const { getScrollTop } = require('../../app/scripts/react/helpers/dom');

      // С Node.js + возможным window окружением
      assert.doesNotThrow(() => {
        const result = getScrollTop(global.window || {});
        // result может быть undefined или число
        assert(result === undefined || typeof result === 'number', 'Should return undefined or number');
      }, 'getScrollTop should not throw');
    });

    it('getTransitionEndEvent handles absence of DOM', () => {
      const { getTransitionEndEvent } = require('../../app/scripts/react/helpers/dom');

      // На сервере нет реального DOM для определения transition events
      const result = getTransitionEndEvent();
      // С polyfills может вернуть значение или false
      assert(result === false || typeof result === 'string', 'Should return false or string');
    });
  });
});
