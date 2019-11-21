/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      console.error('Передан пустой элемент');
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const income = this.element.querySelector('.create-income-button');
    const expence = this.element.querySelector('.create-expense-button');

    income.addEventListener('click', function() {
      const incomeWindow = App.getModal('newIncome');
      incomeWindow.open();
    });

    expence.addEventListener('click', function() {
      const expenceWindow = App.getModal('newExpense');
      expenceWindow.open();
    });
  }
}
