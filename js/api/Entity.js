/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diplom.letsdocode.ru'.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      responseType: 'json',
      data,
      method: 'GET',
      callback
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      responseType: 'json',
      data: Object.assign({_method:'PUT'}, data),
      method: 'POST',
      callback
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      responseType: 'json',
      data: Object.assign({id: id}, data),
      method: 'GET',
      callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.HOST + this.URL,
      responseType: 'json',
      data: Object.assign({id: id, _method: 'DELETE'}, data),
      method: 'POST',
      callback
    });
  }
}

Entity.URL = '';
Entity.HOST = 'https://bhj-diplom.letsdocode.ru';
