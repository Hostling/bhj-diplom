/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
    this.element = element;
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let accountsList = this.element.querySelector('.accounts-select');
    Account.list(User.current(), (err, response) => {
      if (response.data) {
        accountsList.innerHTML = "";
        response.data.forEach((item) => {
          accountsList.innerHTML += `<option value="${item.id}">${item.name}</option>`;
        });
      } else {
        console.error('Ошибка получения списка счетов');
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (response.success === true) {
        this.element.reset();
        const type = options.data.type;
        const modalName = `new${type[0].toUpperCase()}${type.substr(1)}`;
        let transactionModal = App.getModal(modalName);
        transactionModal.close();
        App.update();
      }
    });
  }
}
