// @ts-nocheck
/**
 * SSR Polyfills
 *
 * Минимальные заглушки для browser APIs, которые используются в компонентах.
 * Импортировать ПЕРВЫМ в server/index.ts перед любыми React компонентами.
 *
 * Эти polyfills позволяют компонентам, которые проверяют наличие browser APIs,
 * работать на сервере без ошибок.
 *
 * ВАЖНО: Polyfills не эмулируют полную функциональность, только предотвращают
 * ошибки при доступе к undefined свойствам.
 *
 * @ts-nocheck применён, так как этот файл намеренно переопределяет глобальные типы
 * для серверной среды, что TypeScript не может корректно валидировать.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  // eslint-disable-next-line no-var
  var window: any;
  // eslint-disable-next-line no-var
  var document: any;
  // eslint-disable-next-line no-var
  var gon: any;
}

// Проверяем что мы на сервере
const isServer = typeof globalThis.window === 'undefined';

if (isServer) {
  // ============================================
  // Window polyfill
  // ============================================
  const windowPolyfill = {
    // Location
    location: {
      href: '',
      pathname: '',
      search: '',
      hash: '',
      origin: '',
      protocol: 'https:',
      host: '',
      hostname: '',
      port: '',
      replace: () => {},
      assign: () => {},
      reload: () => {},
    },

    // Timers (используем native)
    setTimeout: globalThis.setTimeout,
    clearTimeout: globalThis.clearTimeout,
    setInterval: globalThis.setInterval,
    clearInterval: globalThis.clearInterval,

    // Animation
    requestAnimationFrame: (cb: FrameRequestCallback): number => {
      return globalThis.setTimeout(() => cb(Date.now()), 16) as unknown as number;
    },
    cancelAnimationFrame: (id: number): void => {
      globalThis.clearTimeout(id);
    },

    // Event listeners (no-op)
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,

    // Navigation
    navigator: {
      userAgent: 'SSR/Bun',
      language: 'en',
      languages: ['en'],
      platform: 'server',
      onLine: true,
    },

    // Dimensions
    innerWidth: 1024,
    innerHeight: 768,
    outerWidth: 1024,
    outerHeight: 768,
    devicePixelRatio: 1,

    // Scroll
    scrollX: 0,
    scrollY: 0,
    pageXOffset: 0,
    pageYOffset: 0,
    scrollTo: () => {},
    scrollBy: () => {},
    scroll: () => {},

    // History
    history: {
      length: 1,
      state: null,
      back: () => {},
      forward: () => {},
      go: () => {},
      pushState: () => {},
      replaceState: () => {},
    },

    // Storage (no-op)
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      length: 0,
    },

    // URL API
    URL: globalThis.URL,
    URLSearchParams: globalThis.URLSearchParams,

    // Other
    alert: () => {},
    confirm: () => false,
    prompt: () => null,
    print: () => {},
    open: () => null,
    close: () => {},
    focus: () => {},
    blur: () => {},

    // Match media (always returns false)
    matchMedia: () => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),

    // Computed style
    getComputedStyle: () => ({
      getPropertyValue: () => '',
    }),
  };

  // Self-reference для window.top, window.parent
  (windowPolyfill as any).top = windowPolyfill;
  (windowPolyfill as any).parent = windowPolyfill;
  (windowPolyfill as any).self = windowPolyfill;
  (windowPolyfill as any).window = windowPolyfill;

  globalThis.window = windowPolyfill;

  // ============================================
  // Document polyfill
  // ============================================
  const createNoopElement = (): any => ({
    appendChild: () => createNoopElement(),
    removeChild: () => createNoopElement(),
    insertBefore: () => createNoopElement(),
    replaceChild: () => createNoopElement(),
    cloneNode: () => createNoopElement(),
    setAttribute: () => {},
    getAttribute: () => null,
    removeAttribute: () => {},
    hasAttribute: () => false,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
    focus: () => {},
    blur: () => {},
    click: () => {},
    submit: () => {},
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => false,
      contains: () => false,
      replace: () => {},
      item: () => null,
      length: 0,
    },
    style: new Proxy(
      {},
      {
        get: () => '',
        set: () => true,
      }
    ),
    dataset: {},
    children: [],
    childNodes: [],
    firstChild: null,
    lastChild: null,
    nextSibling: null,
    previousSibling: null,
    parentNode: null,
    parentElement: null,
    innerHTML: '',
    outerHTML: '',
    innerText: '',
    textContent: '',
    value: '',
    checked: false,
    selected: false,
    disabled: false,
    readOnly: false,
    name: '',
    id: '',
    className: '',
    tagName: 'DIV',
    nodeName: 'DIV',
    nodeType: 1,
    nodeValue: null,
    content: '', // Для meta tags
    ownerDocument: null,
    getBoundingClientRect: () => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    }),
    getClientRects: () => [],
    scrollIntoView: () => {},
    matches: () => false,
    closest: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementsByTagName: () => [],
    getElementsByClassName: () => [],
  });

  // Pre-create head and body elements for reuse
  const headElement = createNoopElement();
  headElement.tagName = 'HEAD';
  headElement.nodeName = 'HEAD';

  const bodyElement = createNoopElement();
  bodyElement.tagName = 'BODY';
  bodyElement.nodeName = 'BODY';

  const htmlElement = createNoopElement();
  htmlElement.tagName = 'HTML';
  htmlElement.nodeName = 'HTML';

  const documentPolyfill = {
    // Queries - return elements when querying for head/body
    querySelector: (selector: string) => {
      if (selector === 'head' || selector === 'HEAD') return headElement;
      if (selector === 'body' || selector === 'BODY') return bodyElement;
      if (selector === 'html' || selector === 'HTML') return htmlElement;
      return null;
    },
    querySelectorAll: (selector: string) => {
      if (selector === 'head' || selector === 'HEAD') return [headElement];
      if (selector === 'body' || selector === 'BODY') return [bodyElement];
      return [];
    },
    getElementById: () => null,
    getElementsByName: () => [],
    getElementsByTagName: (tagName: string) => {
      const tag = tagName.toLowerCase();
      if (tag === 'head') return [headElement];
      if (tag === 'body') return [bodyElement];
      if (tag === 'html') return [htmlElement];
      return [];
    },
    getElementsByClassName: () => [],
    elementFromPoint: () => null,
    elementsFromPoint: () => [],

    // Creation
    createElement: (tagName: string) => {
      const el = createNoopElement();
      el.tagName = tagName.toUpperCase();
      el.nodeName = tagName.toUpperCase();
      // Add sheet property for style elements (used by spin.js)
      if (tagName.toLowerCase() === 'style') {
        el.sheet = {
          cssRules: [],
          insertRule: () => 0,
          deleteRule: () => {},
        };
        el.styleSheet = el.sheet;
      }
      return el;
    },
    createElementNS: () => createNoopElement(),
    createTextNode: (text: string) => {
      const node = createNoopElement();
      node.textContent = text;
      node.nodeType = 3; // TEXT_NODE
      return node;
    },
    createComment: () => createNoopElement(),
    createDocumentFragment: () => createNoopElement(),
    createEvent: () => ({
      initEvent: () => {},
      preventDefault: () => {},
      stopPropagation: () => {},
    }),

    // Special elements
    body: bodyElement,
    head: headElement,
    documentElement: htmlElement,

    // Location reference
    location: windowPolyfill.location,

    // Properties
    readyState: 'complete',
    title: '',
    domain: '',
    referrer: '',
    URL: '',
    documentURI: '',
    cookie: '',
    lastModified: '',
    charset: 'UTF-8',
    characterSet: 'UTF-8',
    contentType: 'text/html',

    // Events
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,

    // Other
    write: () => {},
    writeln: () => {},
    open: () => {},
    close: () => {},
    hasFocus: () => false,
    execCommand: () => false,
    queryCommandEnabled: () => false,
    queryCommandSupported: () => false,

    // Visibility
    hidden: false,
    visibilityState: 'visible',
  };

  globalThis.document = documentPolyfill;

  // ============================================
  // gon polyfill
  // Значения берутся из ENV через config модуль
  // ============================================

  // Импортируем config динамически чтобы избежать циклических зависимостей
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { config } = require('./config');

  globalThis.gon = {
    asset_host: config.assetHost,
    thumbor_url: config.thumborUrl,
    max_items_count: config.maxItemsCount,
    i18n: {
      locale: 'en',
      translations: {},
    },
    __data: {
      design: {},
    },
  };
}

// Export для возможности импорта как модуля
export {};
