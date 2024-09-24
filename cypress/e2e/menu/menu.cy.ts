describe('Menu navigation', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('testuser');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login]').click();
  });
  it('Home page is correct', () => {
    cy.url().then((url) => {
      const path = new URL(url).pathname;
      expect(path).to.eq('/');
    });
  });
  it('Gets map page', () => {
    cy.get('.ant-menu-title-content').contains('Map').click();
    cy.url().then((url) => {
      const path = new URL(url).pathname;
      expect(path).to.eq('/map');
    });
  });

  it('Gets consumption page', () => {
    cy.get('.ant-menu-title-content').contains('Consumption').click();
    cy.url().then((url) => {
      const path = new URL(url).pathname;
      expect(path).to.eq('/consumption');
    });
  });
  it('Gets losses page', () => {
    cy.get('.ant-menu-title-content').contains('Losses').click();
    cy.url().then((url) => {
      const path = new URL(url).pathname;
      expect(path).to.eq('/loses');
    });
  });
  it('Gets insights page', () => {
    cy.get('.ant-menu-title-content').contains('Insights').click();
    cy.url().then((url) => {
      const path = new URL(url).pathname;
      expect(path).to.eq('/insights');
    });
  });
  it('Gets preferences page', () => {
    cy.get('.ant-menu-title-content').contains('Settings').click();
    cy.get('.ant-menu-title-content').contains('Preferences').click();
    cy.url().then((url) => {
      const path = new URL(url).pathname;
      expect(path).to.eq('/settings/preferences');
    });
  });
  it('Should collapse and then expand the Sider', () => {
    // Initially, the Sider should be expanded
    cy.get('.ant-layout-sider').should(
      'not.have.class',
      'ant-layout-sider-collapsed'
    );

    // Click on the collapse button to collapse the Sider
    cy.get('.ant-layout-sider-trigger').click();

    // After clicking the collapse button, the Sider should be collapsed
    cy.get('.ant-layout-sider').should(
      'have.class',
      'ant-layout-sider-collapsed'
    );

    // Click on the expand button to expand the Sider
    cy.get('.ant-layout-sider-trigger').click();

    // After clicking the expand button, the Sider should be expanded again
    cy.get('.ant-layout-sider').should(
      'not.have.class',
      'ant-layout-sider-collapsed'
    );
  });
  it('Should get dashboard page on logo click', () => {
    cy.get('[data-cy=logo]').click();
    cy.url().then((url) => {
      const path = new URL(url).pathname;
      expect(path).to.eq('/');
    });
  });
});
