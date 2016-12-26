import apiRoutes from 'scripts/routes/api';
import { includes } from 'lodash';
import $ from 'jquery';

const TIMEOUT = 10000;
const _pendingRequests = {};

function abortPendingRequests(key) {
  if (_pendingRequests[key]) {
    _pendingRequests[key].abort();
    _pendingRequests[key] = null;
  }
}

const vendorKey = () => 'c3d753f03d73251bb4aa707e077ec8e7';

function request(_method, url, data = {}) {
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Vendor-Key': vendorKey(),
  };

  const method = includes(['POST', 'PUT', 'DELETE'], _method) ? 'POST' : 'GET';

  $.ajax({
    url: url,
    method: method,
    data: { ...data, _method },
    headers: headers,
    timeout: TIMEOUT,
    xhrFields: {
      withCredentials: true,
      crossDomain: true,
    },
  });
}

const getRequest = (url, data) => request('GET', url, data);
const postRequest = (url, data) => request('POST', url, data);
const putRequest = (url, data) => request('PUT', url, data);
const deleteRequest = (url, data) => request('DELETE', url, data);

export default {
  catalogFilter: {
    getFilteredCount(filter) {
      const url = apiRoutes.productsFilteredCount(filter);
      const key = 'productsFilteredCount';

      abortPendingRequests(key);
      _pendingRequests[key] = getRequest(url);
    },
  },
};
