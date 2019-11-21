/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let body = document.getElementsByTagName('body')[0];
    document.querySelector('.sidebar-toggle').addEventListener('click', (e) => {
      body.classList.toggle('sidebar-collapse');
      body.classList.toggle('sidebar-open');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const login = document.querySelector(".menu-item_login");
    const register = document.querySelector(".menu-item_register");
    const logout = document.querySelector(".menu-item_logout");

    login.addEventListener("click", function(e) {
      const loginModal = App.getModal("login");
      loginModal.open();
    });

    register.addEventListener("click", function(e) {
      const registerModal = App.getModal("register");
      registerModal.open();
    });

    logout.addEventListener("click", function(e) {
      User.logout({}, (err, response) => {
        if (response && response.success === true) {
          App.setState("init");
          User.unsetCurrent();
        }
      });
    });
  }

}
