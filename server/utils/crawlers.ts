/**
 * Crawler Detection Utility
 *
 * Определяет, является ли запрос от поискового crawler/bot.
 * Для crawlers используется waitForAll, чтобы они получили полный HTML.
 */

/**
 * Список User-Agent паттернов для известных crawlers.
 * Регулярные выражения для case-insensitive поиска.
 */
const CRAWLER_PATTERNS: RegExp[] = [
  // Google
  /googlebot/i,
  /google-inspectiontool/i,
  /google-extended/i,
  /adsbot-google/i,
  /mediapartners-google/i,
  /feedfetcher-google/i,
  /google-structured-data-testing-tool/i,
  /googleweblight/i,
  /storebot-google/i,

  // Bing/Microsoft
  /bingbot/i,
  /msnbot/i,
  /bingpreview/i,
  /adidxbot/i,

  // Yandex
  /yandexbot/i,
  /yandexmobilebot/i,
  /yandexaccessibilitybot/i,
  /yandexdirectdyn/i,
  /yandexscreenshotbot/i,
  /yandexvideo/i,
  /yandexvideoparser/i,
  /yandeximages/i,
  /yandexblogs/i,
  /yandexfavicons/i,
  /yandexwebmaster/i,
  /yandexpagechecker/i,
  /yandexmetrika/i,
  /yandexnews/i,
  /yandexcalendar/i,
  /yandexsitelinks/i,
  /yandexmarket/i,
  /yandexvertis/i,
  /yandexfordomain/i,
  /yandexspravbot/i,
  /yandexsearchshop/i,
  /yandexmediasellingbot/i,
  /yandexontodb/i,
  /yandexverticals/i,

  // Baidu
  /baiduspider/i,
  /baiduspider-image/i,
  /baiduspider-video/i,
  /baiduspider-news/i,
  /baiduspider-favo/i,
  /baidu-yunguance/i,

  // DuckDuckGo
  /duckduckbot/i,
  /duckduckgo-favicons-bot/i,

  // Facebook
  /facebookexternalhit/i,
  /facebot/i,

  // Twitter
  /twitterbot/i,

  // LinkedIn
  /linkedinbot/i,

  // Pinterest
  /pinterest/i,
  /pinterestbot/i,

  // Slack
  /slackbot/i,
  /slackbot-linkexpanding/i,

  // Telegram
  /telegrambot/i,

  // WhatsApp
  /whatsapp/i,

  // Discord
  /discordbot/i,

  // Apple
  /applebot/i,

  // Other search engines
  /sogou/i,
  /exabot/i,
  /ia_archiver/i,
  /alexa/i,
  /deusu/i,
  /seznam/i,

  // SEO/Monitoring tools
  /ahrefsbot/i,
  /semrushbot/i,
  /dotbot/i,
  /rogerbot/i,
  /mj12bot/i,
  /screaming frog/i,
  /seokicks/i,
  /sistrix/i,
  /blexbot/i,
  /petalbot/i,

  // Uptime/Monitoring
  /uptimerobot/i,
  /pingdom/i,
  /site24x7/i,
  /statuscake/i,

  // Preview/Rendering
  /prerender/i,
  /headlesschrome/i,
  /phantomjs/i,
];

/**
 * Проверяет, является ли User-Agent crawler/bot.
 *
 * @param userAgent - User-Agent header из запроса
 * @returns true если это crawler
 *
 * @example
 * isCrawler('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
 * // => true
 *
 * isCrawler('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')
 * // => false
 */
export function isCrawler(userAgent: string | null | undefined): boolean {
  if (!userAgent) {
    return false;
  }

  return CRAWLER_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Получает название crawler если определён.
 *
 * @param userAgent - User-Agent header
 * @returns название crawler или null
 */
export function getCrawlerName(userAgent: string | null | undefined): string | null {
  if (!userAgent) {
    return null;
  }

  // Map patterns to names
  const crawlerNames: Array<[RegExp, string]> = [
    [/googlebot/i, 'Googlebot'],
    [/bingbot/i, 'Bingbot'],
    [/yandexbot/i, 'YandexBot'],
    [/baiduspider/i, 'Baiduspider'],
    [/duckduckbot/i, 'DuckDuckBot'],
    [/facebookexternalhit/i, 'Facebook'],
    [/twitterbot/i, 'Twitter'],
    [/linkedinbot/i, 'LinkedIn'],
    [/slackbot/i, 'Slack'],
    [/telegrambot/i, 'Telegram'],
    [/whatsapp/i, 'WhatsApp'],
    [/discordbot/i, 'Discord'],
    [/applebot/i, 'Applebot'],
    [/ahrefsbot/i, 'Ahrefs'],
    [/semrushbot/i, 'SEMrush'],
    [/prerender/i, 'Prerender'],
    [/headlesschrome/i, 'Headless Chrome'],
  ];

  for (const [pattern, name] of crawlerNames) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }

  // Check if matches any crawler pattern
  if (isCrawler(userAgent)) {
    return 'Unknown Bot';
  }

  return null;
}
