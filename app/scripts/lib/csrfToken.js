/*global $ */
if (typeof $ === 'function') {
  const token = $('meta[name="csrf-token"]').attr('content');

  $.ajaxSetup({
    beforeSend: (xhr) => {
      xhr.setRequestHeader('X-CSRF-Token', token);

      // Используем meta-тег access-token вместо gon.access_token
      const accessTokenMeta = document.querySelector('meta[name="access-token"]');
      const accessToken = accessTokenMeta ? accessTokenMeta.content : null;
      if (accessToken) {
        xhr.setRequestHeader('X-Access-Token', accessToken);
      }
    },
  });
}
