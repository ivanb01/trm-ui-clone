describe('Consumption Component', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('testuser');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login]').click();
  });

  /* it('should render all components', () => {
    cy.visit('/consumption');
    // Check if the Table component is rendered
    cy.get('[data-cy=ant-table]').should('exist');

    // Check if the table headers are rendered
    cy.get('[data-cy=ant-table]').within(() => {
      cy.get('thead').should('exist');
      cy.get('thead').find('tr').should('exist');
    });

    // Check if the table body is rendered
    cy.get('[data-cy=ant-table]').within(() => {
      cy.get('tbody').should('exist');
    });
  });*/
});
