/**
 * test part where theme is set up
 */
describe('Theme section', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('testuser');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login]').click();
  });
  it('Should have theme settings fields', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=theme-switch]').should('exist');
    cy.get('[data-cy=theme-color]').should('exist');
    cy.get('[data-cy=theme-size]').should('exist');
    cy.get('[data-cy=theme-font-size]').should('exist');
    cy.get('[data-cy=theme-graph-style]').should('exist');
  });
  it('changes date theme base dark and light', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=theme-switch]').click();
    cy.get('[data-cy=global-container]').should(
      'have.css',
      'background-color',
      'rgb(0, 0, 0)'
    );
    cy.get('[data-cy=theme-switch]').click();
    cy.get('[data-cy=global-container]').should(
      'have.css',
      'background-color',
      'rgb(245, 245, 245)'
    );
  });
  it('changes primary color', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=theme-color]').invoke('val', '#ff0000').trigger('change');
  });
  it('changes primary size', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=theme-size]').invoke('val', '#ff0000').trigger('change');
  });
  it('font size does not allow input of value less than 10', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=theme-font-size]').clear().type('9').blur();
    cy.get('[data-cy=theme-font-size]').should('have.value', '10');
  });

  it('font size does not allow input of value greater than 20', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=theme-font-size]').clear().type('21').blur();
    cy.get('[data-cy=theme-font-size]').should('have.value', '20');
  });
  it('allows input of value between 10 and 20', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=max-decimals]').clear().type('14').blur();
    cy.get('[data-cy=max-decimals]').should('have.value', '14');
  });
});
/**
 * test part where data format is set up
 */
describe('Data format section', () => {
  beforeEach(() => {
    // Visit the login page and log in with valid credentials
    cy.visit('/login');
    cy.get('[data-cy=username]').type('testuser');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login]').click();
  });
  it('Should have format fields: max-decimals, date and number format', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=date-format]').should('exist');
    cy.get('[data-cy=number-format]').should('exist');
    cy.get('[data-cy=max-decimals]').should('exist');
  });
  it('changes date format', () => {
    cy.visit('/settings/preferences');
    cy.multiSelect('[data-cy=date-format]', 'D.M.YYYY');
  });
  it('changes number format', () => {
    cy.visit('/settings/preferences');
    cy.multiSelect('[data-cy=number-format]', '10,000.00');
    cy.multiSelect('[data-cy=number-format]', '10 000,00');
    cy.multiSelect(
      '[data-cy=number-format]',
      (10000).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    );
  });
  it('does not allow input of value less than 0', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=max-decimals]').clear().type('-1').blur();
    cy.get('[data-cy=max-decimals]').should('have.value', '0');
  });

  it('does not allow input of value greater than 9', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=max-decimals]').clear().type('10').blur();
    cy.get('[data-cy=max-decimals]').should('have.value', '9');
  });

  it('allows input of value between 0 and 9', () => {
    cy.visit('/settings/preferences');
    cy.get('[data-cy=max-decimals]').clear().type('5').blur();
    cy.get('[data-cy=max-decimals]').should('have.value', '5');
  });
});
