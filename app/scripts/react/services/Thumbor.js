/*global gon */
const MAX_POW = 9;
const STEP = 256;

function stepSize(size) {
  for (let p = 6; p<=MAX_POW; p++) {
    const pow = Math.pow(2, p);
    if (size <= pow) {
      // console.log(`Return for size: ${size} -> ${pow}`);
      return pow;
    }
  }
  const val = Math.ceil(size / STEP)*STEP;
  // console.log(`Return for size: ${size} -> ${val}`);
  return val;
}

function stepSizes(size, rk = 1) {
  var width, height;
  if (size.width && size.height) {
    width = stepSize(size.width) * rk;
    const k = width/size.width;
    height = Math.round(size.height * k);
  } else if (size.width) {
    width = stepSize(size.width) * rk;
    height = '';
  } else if (size.height) {
    height = stepSize(size.height) * rk;
    width = '';
  }
  // console.log(`Request size: ${size}, ${rk}, return [${width}, ${height}]`);
  return [width, height];
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
    const _url = normalizeUrl(url);
    const _filters = normalizeFilters(filters);

    const [width, height] = stepSizes(size);

    return this.thumborUrl()
      ? `${this.thumborUrl()}/unsafe/${width}x${height}${_filters}/${_url}`
      : url;
  },
  retinaImageUrl(url, size, filters) {
    const [width, height] = stepSizes(size, 2);
    const _url = normalizeUrl(url);
    const _filters = normalizeFilters(filters);

    return this.thumborUrl()
      ? `${this.thumborUrl()}/unsafe/${width}x${height}${_filters}/${_url} 2x`
      : url;
  },
};

export default ThumborService;
