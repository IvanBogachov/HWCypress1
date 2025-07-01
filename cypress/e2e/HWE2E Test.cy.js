describe('Домашня робота', () => {
  it('Тест №1', () => {
    // Тест відвідування сайту LMS
    cy.visit('https://www.edu.goit.global/account/login');
    cy.login('user888@gmail.com', '1234567890');
    // Встановити розмір вікна до мобільного (1023px або менше)
    cy.viewport(1020, 800);
    // Знайти бургер-меню (правий верхній кут) та натиснути
    cy.get('#open-navigation-menu-mobile').should('be.visible').click();
    // Клікаємо Log out
    cy.contains('button', 'Log out').should('be.visible').click();
    // Перевірка: повернення на сторінку логіну (перевірка наявності поля email)
    cy.get('#user_email').should('be.visible');
  });

  it('Тест №2', () => {
    // Тест відвідування сайту LMS
    cy.visit('https://www.edu.goit.global/account/login');
    cy.login('testowyqa@qa.team', 'QA!automation-1');
    // Встановити розмір вікна до мобільного (1023px або менше)
    cy.viewport(1020, 800);
    // Знайти бургер-меню (правий верхній кут) та натиснути
    cy.get('#open-navigation-menu-mobile').should('be.visible').click();
    // Клікаємо Log out
    cy.contains('button', 'Log out').should('be.visible').click();
    // Перевірка: повернення на сторінку логіну (перевірка наявності поля email)
    cy.get('#user_email').should('be.visible');
  });
});
