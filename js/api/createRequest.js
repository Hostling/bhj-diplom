/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  function addHeaders() {
    for(let key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
    }
  }
  xhr.responseType = options.responseType;
  let formData = new FormData;

  if(options.method == 'GET'){
      if(options.data) {
        options.url += '/?';
        for(let key in options.data) {
          options.url += `${key}=${options.data[key]}&`;
        }
      }
  } else {
    for(let key in options.data) {
      formData.append(key, options.data[key]);
    }
  }
  try {
      xhr.open(options.method, options.url, true);
      addHeaders();
      xhr.withCredentials = true;
      xhr.send(formData);
  }
  catch (err) {
    options.callback(err);
    console.error(xhr);
  }

  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      options.callback(null, xhr.response);
    }
  });

  return xhr;

};
