import { Login } from '../pages/Login';
import { LoginPage, MainPage } from '../pages/HomePage';

const LoginPage1 = new Login();
const LoginPage2 = new LoginPage();
const MainPage2 = new MainPage();

describe('Page object example', () => {
  it('Тест №1 - login page test', () => {
    // visit page
    LoginPage1.navigate();
    // check title
    LoginPage1.validateLoginTitle();
    // check inputs
    LoginPage1.validateInputs();
    // check button
    LoginPage1.validateButton();
    // check link
    LoginPage1.validatePasswordLink();
  });

  it('Тест №2 - log in and log out', () => {
    LoginPage2.navigate();
    LoginPage2.login('user888@gmail.com', '1234567890');

    MainPage2.openBurgerMenu();
    MainPage2.clickLogout();
    MainPage2.assertBackToLogin();
  });
});
