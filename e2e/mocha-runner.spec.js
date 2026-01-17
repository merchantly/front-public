import { test, expect } from '@playwright/test';

test('run mocha browser tests', async ({ page }) => {
  // Включаем логирование консоли браузера
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser error:', msg.text());
    }
  });

  await page.goto('/test/index.html');

  // Ждём завершения Mocha (появление stats)
  await page.waitForSelector('#mocha-stats', { timeout: 120000 });

  // Ждём пока все тесты завершатся (duration появляется в конце)
  await page.waitForFunction(() => {
    const duration = document.querySelector('#mocha-stats .duration');
    return duration && duration.textContent.length > 0;
  }, { timeout: 120000 });

  // Получаем результаты
  const stats = await page.evaluate(() => {
    const passes = document.querySelector('#mocha-stats .passes em');
    const failures = document.querySelector('#mocha-stats .failures em');
    return {
      passes: passes ? parseInt(passes.textContent) : 0,
      failures: failures ? parseInt(failures.textContent) : 0
    };
  });

  console.log(`Mocha results: ${stats.passes} passes, ${stats.failures} failures`);

  // Если есть ошибки, выводим их
  if (stats.failures > 0) {
    const errorMessages = await page.$$eval('.test.fail', tests =>
      tests.map(t => {
        const title = t.querySelector('h2');
        const error = t.querySelector('.error');
        return `${title?.textContent || 'Unknown'}: ${error?.textContent?.substring(0, 200) || ''}`;
      })
    );
    console.log('Failed tests:');
    errorMessages.forEach(msg => console.log('  -', msg));
  }

  expect(stats.failures).toBe(0);
});
