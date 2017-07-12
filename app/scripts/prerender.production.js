global.gon = {
  env: 'production',
  // operator_api_url: 'http://wannabe.kiiiosk.ru/operator/api',
  // public_api_url: 'http://wannabe.kiiiosk.ru/api',
  thumbor_url: '//thumbor2.kiiiosk.ru',
  kiiiosk: true,
  max_items_count: 100,
  asset_host: 'assets.kiiiosk.ru',
};

require('./prerender.bundle');
