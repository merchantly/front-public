/*global gon */
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
  thumbor: global.mrch ? global.mrch.config.thumbor_url : global.gon.thumbor_url,
  imageUrl(url, size, filters) {
    const width = size.width ? size.width : '';
    const height = size.height ? size.height : '';
    const _url = normalizeUrl(url);
    const _filters = normalizeFilters(filters);

    console.log(filters);

    return this.thumbor
      ? `${this.thumbor}/unsafe/${width}x${height}${_filters}/${_url}`
      : url;
  },
  retinaImageUrl(url, size, filters) {
    const width = size.width ? size.width * 2 : '';
    const height = size.height ? size.height * 2 : '';
    const _url = normalizeUrl(url);
    const _filters = normalizeFilters(filters);

    console.log(filters);

    return this.thumbor
      ? `${this.thumbor}/unsafe/${width}x${height}${_filters}/${_url} 2x`
      : url;
  },
};

export default ThumborService;
