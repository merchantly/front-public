import reqwest from 'reqwest';
import prepareData from '../utils/prepareData';

function vendorToken () {
  return 'adsh213472orafasdf897sckasBCK';
  // CurrentUserStore.getAccessToken()
}

function request(_method, url, srcData = {}) {

  let contentType, processData, method;
  const headers = prepareData({
    'X-Requested-With': 'XMLHttpRequest',
    'X-Vendor-Token': vendorToken()
  });
  const data = prepareData({ ...srcData, _method });

  if (data instanceof FormData) {
    contentType = null;
    processData = false;
  } else {
    contentType = 'application/json';
    processData = true;
  }

  switch(_method) {
    case 'POST': case 'PUT': case 'DELETE':
      method = 'POST'; break;
    default:
      method = 'GET'; break;
  }

  return reqwest({ url, headers, method, data, contentType, processData });
}

export default {
  get(url, srcData) {
    return request('GET', url, srcData);
  },
  create(url, srcData) {
    return request('POST', url, srcData);
  },
  update(url, srcData) {
    return request('PUT', url, srcData);
  },
  delete(url, srcData) {
    return request('DELETE', url, srcData);
  }
}
