export const simpleFormat = (str = '') => {
  let newStr = str.trim();

  if (newStr.length) {
    newStr = str.replace(/\n\n+/g, '</p><p>');
    newStr = str.replace(/\n/g, '<br />');
    newStr = `<p>${newStr}</p>`;
  }

  return newStr;
};