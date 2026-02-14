/*global gon */

const BREAKPOINTS = [40, 80, 160, 240, 320, 480, 640, 768, 1024, 1280, 1536, 1920, 2560];

function snapToBreakpoint(value) {
  if (value == null) return value;
  return BREAKPOINTS.find(bp => bp >= value) || BREAKPOINTS[BREAKPOINTS.length - 1];
}

function normalizeUrl(url) {
  return /^\/\/\S*$/.test(url) ? `http:${url}` : url;
}

function normalizeFilters(additional = []) {
  const common = []; //['no_upscale()'];
  const fx = [
    ...common,
    ...additional,
  ];
  return fx.length ? `/filters:${fx.join(':')}` : '';
}

const ThumborService = {
  thumborUrl() {
    return global.mrch ? global.mrch.config.thumbor_url : global.gon.thumbor_url;
  },
  imageUrl(url, size, filters) {
    const width = size.width ? snapToBreakpoint(size.width) : '';
    const _url = normalizeUrl(url);
    const _filters = normalizeFilters(filters);

    return this.thumborUrl()
      ? `${this.thumborUrl()}/unsafe/${width}x${_filters}/${_url}`
      : url;
  },
  retinaImageUrl(url, size, filters) {
    const width = size.width ? snapToBreakpoint(size.width * 2) : '';
    const _url = normalizeUrl(url);
    const _filters = normalizeFilters(filters);

    return this.thumborUrl()
      ? `${this.thumborUrl()}/unsafe/${width}x${_filters}/${_url} 2x`
      : url;
  },
};

export default ThumborService;
