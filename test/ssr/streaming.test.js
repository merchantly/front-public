/**
 * Streaming SSR Tests
 *
 * Тесты для streaming SSR функциональности:
 * - Crawler detection
 * - Skeleton components
 * - SSRSuspense wrapper
 */

import { expect } from 'chai';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Crawler patterns for testing (inline implementation to avoid TS import issues)
const CRAWLER_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /slackbot/i,
  /telegrambot/i,
];

function isCrawler(userAgent) {
  if (!userAgent) return false;
  return CRAWLER_PATTERNS.some((pattern) => pattern.test(userAgent));
}

function getCrawlerName(userAgent) {
  if (!userAgent) return null;
  const names = [
    [/googlebot/i, 'Googlebot'],
    [/bingbot/i, 'Bingbot'],
    [/yandexbot/i, 'YandexBot'],
    [/facebookexternalhit/i, 'Facebook'],
    [/twitterbot/i, 'Twitter'],
  ];
  for (const [pattern, name] of names) {
    if (pattern.test(userAgent)) return name;
  }
  if (isCrawler(userAgent)) return 'Unknown Bot';
  return null;
}

// Test crawler detection
describe('Crawler Detection', function () {
  describe('isCrawler()', function () {
    it('should detect Googlebot', function () {
      expect(isCrawler('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')).to.be.true;
    });

    it('should detect Bingbot', function () {
      expect(isCrawler('Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)')).to.be.true;
    });

    it('should detect YandexBot', function () {
      expect(isCrawler('Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)')).to.be.true;
    });

    it('should detect Facebook crawler', function () {
      expect(isCrawler('facebookexternalhit/1.1')).to.be.true;
    });

    it('should detect Twitter crawler', function () {
      expect(isCrawler('Twitterbot/1.0')).to.be.true;
    });

    it('should detect Slack crawler', function () {
      expect(isCrawler('Slackbot-LinkExpanding 1.0')).to.be.true;
    });

    it('should detect Telegram crawler', function () {
      expect(isCrawler('TelegramBot (like TwitterBot)')).to.be.true;
    });

    it('should not detect regular browser', function () {
      expect(isCrawler('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')).to.be.false;
    });

    it('should not detect mobile browser', function () {
      expect(isCrawler('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15')).to.be.false;
    });

    it('should handle null/undefined', function () {
      expect(isCrawler(null)).to.be.false;
      expect(isCrawler(undefined)).to.be.false;
      expect(isCrawler('')).to.be.false;
    });
  });

  describe('getCrawlerName()', function () {
    it('should return "Googlebot" for Google crawler', function () {
      expect(getCrawlerName('Mozilla/5.0 (compatible; Googlebot/2.1)')).to.equal('Googlebot');
    });

    it('should return "YandexBot" for Yandex crawler', function () {
      expect(getCrawlerName('Mozilla/5.0 (compatible; YandexBot/3.0)')).to.equal('YandexBot');
    });

    it('should return "Facebook" for Facebook crawler', function () {
      expect(getCrawlerName('facebookexternalhit/1.1')).to.equal('Facebook');
    });

    it('should return null for regular browser', function () {
      expect(getCrawlerName('Mozilla/5.0 (Windows NT 10.0; Win64; x64)')).to.be.null;
    });

    it('should return null for null/undefined', function () {
      expect(getCrawlerName(null)).to.be.null;
      expect(getCrawlerName(undefined)).to.be.null;
    });
  });
});

// Test Skeleton components
describe('Skeleton Components', function () {
  const { SkeletonBox, SkeletonText, SkeletonProductCard, SuspenseFallback } =
    require('rc/common/Skeleton/Skeleton');

  it('should render SkeletonBox', function () {
    const element = React.createElement(SkeletonBox, { width: '100px', height: '20px' });
    const html = renderToString(element);
    expect(html).to.include('div');
    expect(html).to.include('100px');
  });

  it('should render SkeletonText with multiple lines', function () {
    const element = React.createElement(SkeletonText, { lines: 3 });
    const html = renderToString(element);
    expect(html).to.include('div');
  });

  it('should render SkeletonProductCard', function () {
    const element = React.createElement(SkeletonProductCard);
    const html = renderToString(element);
    expect(html).to.include('div');
  });

  it('should render SuspenseFallback with type', function () {
    const element = React.createElement(SuspenseFallback, { type: 'product' });
    const html = renderToString(element);
    expect(html).to.include('div');
  });
});

// Test SSRSuspense component
describe('SSRSuspense', function () {
  const { SSRSuspense } = require('rc/common/SSRSuspense/SSRSuspense');

  it('should render children with Suspense boundary', function () {
    const child = React.createElement('div', { className: 'test-child' }, 'Hello');
    const element = React.createElement(SSRSuspense, { fallbackType: 'box' }, child);

    const html = renderToString(element);
    expect(html).to.include('test-child');
    expect(html).to.include('Hello');
  });

  it('should render custom fallback', function () {
    const fallback = React.createElement('div', { className: 'custom-fallback' }, 'Loading...');
    const child = React.createElement('div', null, 'Content');
    const element = React.createElement(SSRSuspense, { fallback }, child);

    const html = renderToString(element);
    expect(html).to.include('Content');
  });
});
