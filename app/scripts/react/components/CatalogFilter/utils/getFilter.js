// import URI from 'urijs';
const URI = {};
import { findDOMNode } from 'react-dom';

export default function getFilter(instance, params = {}) {
  const filter = $(findDOMNode(instance)).closest('form').serializeArray();
  const data = filter.reduce((result, { name, value }) => {
    result[name] = value;
    return result;
  }, {});

  return URI.buildQuery({...data, ...params});
}
