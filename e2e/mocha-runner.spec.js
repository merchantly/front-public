import { test, expect } from '@playwright/test';

// Минимальное ожидаемое количество тестов (обновлять при добавлении тестов)
const MINIMUM_EXPECTED_TESTS = 40;

test('run mocha browser tests', async ({ page }) => {
  const pageErrors = [];

  // Перехватываем критические ошибки JavaScript
  page.on('pageerror', error => {
    pageErrors.push(error.message);
    console.error('CRITICAL PAGE ERROR:', error.message);
  });

  // Логирование ошибок консоли браузера
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser console error:', msg.text());
    }
  });

  // Загружаем страницу и проверяем HTTP статус
  const response = await page.goto('/test/index.html');
  if (!response || !response.ok()) {
    throw new Error(`Failed to load test page: HTTP ${response?.status() ?? 'no response'}`);
  }

  // Проверяем, не было ли критических ошибок при загрузке
  if (pageErrors.length > 0) {
    throw new Error(`Page crashed with errors:\n${pageErrors.join('\n')}`);
  }

  // Сначала проверим, что Mocha контейнер существует
  try {
    await page.waitForSelector('#mocha', { timeout: 10000 });
  } catch {
    throw new Error('Mocha container #mocha not found - test HTML may be corrupted');
  }

  // Ждём завершения Mocha (появление stats)
  try {
    await page.waitForSelector('#mocha-stats', { timeout: 60000 });
  } catch {
    const html = await page.content();
    throw new Error(`Mocha stats not found after 60s. Page content preview: ${html.substring(0, 500)}...`);
  }

  // Ждём пока все тесты завершатся (duration появляется в конце)
  await page.waitForFunction(() => {
    const duration = document.querySelector('#mocha-stats .duration');
    return duration && duration.textContent.length > 0;
  }, { timeout: 120000 });

  // Получаем результаты с проверкой наличия элементов
  const stats = await page.evaluate(() => {
    const passes = document.querySelector('#mocha-stats .passes em');
    const failures = document.querySelector('#mocha-stats .failures em');

    // Явно сигнализируем об отсутствии элементов
    if (!passes || !failures) {
      return { error: 'Mocha stats elements not found - tests may not have run' };
    }

    const passCount = parseInt(passes.textContent, 10);
    const failCount = parseInt(failures.textContent, 10);

    // NaN означает проблему с парсингом
    if (isNaN(passCount) || isNaN(failCount)) {
      return { error: `Invalid stats values: passes="${passes.textContent}", failures="${failures.textContent}"` };
    }

    return { passes: passCount, failures: failCount };
  });

  // Проверяем ошибки парсинга статистики
  if (stats.error) {
    throw new Error(stats.error);
  }

  console.log(`Mocha results: ${stats.passes} passes, ${stats.failures} failures`);

  // Проверяем, что хоть какие-то тесты запустились
  if (stats.passes === 0 && stats.failures === 0) {
    throw new Error('No tests were executed - check if test bundle loaded correctly');
  }

  // Если есть ошибки, выводим их полностью
  if (stats.failures > 0) {
    const errorMessages = await page.$$eval('.test.fail', tests =>
      tests.map(t => {
        const title = t.querySelector('h2');
        const error = t.querySelector('.error');
        // Полный текст ошибки
        return `${title?.textContent || 'Unknown test'}\n  ${error?.textContent || 'No error message'}`;
      })
    );

    const fullReport = `${stats.failures} test(s) failed:\n\n${errorMessages.join('\n\n')}`;
    console.log('Failed tests:\n', fullReport);

    // Включаем ошибки в assertion message
    expect(stats.failures, fullReport).toBe(0);
  }

  // Проверяем минимальное количество тестов
  expect(stats.passes).toBeGreaterThanOrEqual(MINIMUM_EXPECTED_TESTS);
  console.log(`Tests executed: ${stats.passes} (minimum expected: ${MINIMUM_EXPECTED_TESTS})`);
});
