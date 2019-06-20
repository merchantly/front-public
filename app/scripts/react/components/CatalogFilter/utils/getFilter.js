import { findDOMNode } from 'react-dom';
import queryString from 'query-string';

export default function getFilter(instance, params = {}) {
  const filter = $(findDOMNode(instance)).closest('form').serializeArray();
  const data = filter.reduce((result, { name, value }) => {
    result[name] = value;
    return result;
  }, {});

  return queryString.stringify({...data, ...params});
}
