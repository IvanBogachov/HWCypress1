export class LoginPage {
  navigate() {
    cy.visit('https://www.edu.goit.global/account/login');
  }
  fillEmail(email) {
    cy.get('#user_email').type(email);
  }
  fillPassword(password) {
    cy.get('#user_password').type(password);
  }
  submit() {
    cy.get('button[type="submit"]').click();
  }
  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}

export class MainPage {
  openBurgerMenu() {
    cy.viewport(1020, 800);
    cy.get('#open-navigation-menu-mobile').should('be.visible').click();
  }

  clickLogout() {
    cy.contains('button', 'Log out').should('be.visible').click();
  }

  assertBackToLogin() {
    cy.get('#user_email').should('be.visible');
  }
}
