describe('Login Page', () => {
  it('Should have username password', () => {
    cy.visit('/login');
    cy.get('[data-cy=username]').should('exist');
    cy.get('[data-cy=password]').should('exist');
  });
  it('Should type username password', () => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('test');
    cy.get('[data-cy=password]').type('test');
    cy.get('[data-cy=username]').should('have.value', 'test');
    cy.get('[data-cy=password]').should('have.value', 'test');
  });
  it('Should login', () => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('test');
    cy.get('[data-cy=password]').type('test');
    cy.get('[data-cy=login]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
