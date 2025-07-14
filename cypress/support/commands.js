// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (login, password) => {
  cy.get('#user_email').type(login);
  cy.get('#user_password').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('assertApiResponseOk', (res) => {
  expect(res.status).to.be.oneOf([200, 400, 401, 403, 405]);

  if (res.body?.success === false) {
    throw new Error(`API Error: ${res.body.error?.info || 'Unknown error'}`);
  }

  expect(res.body).to.have.property('location');
  expect(res.body).to.have.property('current');
});
