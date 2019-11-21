/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log(options);
  const xhr = new XMLHttpRequest();
  function addHeaders() {
    for(let key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
    }
  }
  xhr.responseType = options.responseType;
  
  if(options.method == 'GET'){
    try {
      if(options.data) {
        options.url += '/?';
        for(let key in options.data) {
          options.url += `${key}=${options.data[key]}&`;
          console.log(`key: ${key}; value: ${options.data[key]}`);
        }
      }
      xhr.open('GET', options.url, true);
      addHeaders();
      xhr.withCredentials = true;
      console.log(xhr);
      xhr.send();
      console.log(xhr);
    }
    catch (err) {
      options.callback(err);
      console.error(xhr);
    }
  } else {
    let formData = new FormData;
    for(let key in options.data) {
      formData.append(key, options.data[key]);      
    }
    try {
      xhr.open(options.method, options.url);
      addHeaders();
      xhr.withCredentials = true;
      xhr.send(formData);
      console.log(xhr);
    }
    catch (err) {
      options.callback(err);
      console.error(xhr);
    }
  }
  
  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr);
      options.callback(null, xhr.response);
    }
  });

  return xhr;
  
};
