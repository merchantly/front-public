import buildParams from './buildParams';

export default function prepareData(srcData) {
  let data = {},
      formData = new FormData(),
      isFormData = false;

  let add = function add(key, value) {
    // if (srcData[key] != null) data[key] = srcData[key];
    data[key] = srcData[key];
  };

  Object.keys(srcData).forEach((key) => {
    if (Object.prototype.toString.call(srcData[key]) === '[object File]') {
      isFormData = true;
      add = function add(key, value) {
        formData.append(key, value);
      };
    }
  });

  for(let key in srcData) {
    if(srcData.hasOwnProperty(key)) {
      buildParams(key, srcData[key], false, add);
    }
  }

  return isFormData ? formData : data;
}