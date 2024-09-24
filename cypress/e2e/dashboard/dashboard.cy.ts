describe('Theme section', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('testuser');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login]').click();
  });
  it('Should have widgets', () => {
    cy.get('[data-cy=acard]').should('exist');
    cy.get('[data-cy=bcard]').should('exist');
    cy.get('[data-cy=ccard]').should('exist');
  });
});
