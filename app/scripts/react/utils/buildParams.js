import { isArray, isObject } from 'lodash';

export default function buildParams(prefix, obj, traditional, add) {
  let name, i, v,
      rbracket = /\[\]$/;

  if (isArray(obj)) {
    // Serialize array item.
    for (i = 0; obj && i < obj.length; i++) {
      v = obj[i];
      if (traditional || rbracket.test(prefix)) {
        // Treat each array item as a scalar.
        add(prefix, v);
      } else {
        buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
      }
    }
  } else if (isObject(obj) && Object.prototype.toString.call(obj) !== '[object File]') {
    // Serialize object item.
    for (name in obj) {
      buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
}
