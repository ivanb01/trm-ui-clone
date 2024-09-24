describe('Is Map Present', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy=username]').type('testuser');
    cy.get('[data-cy=password]').type('password');
    cy.get('[data-cy=login]').click();
  });
  it('Is map initialized', () => {
    cy.visit('/map');
    cy.get('[data-cy=map]').should('exist');
    cy.get('[data-cy=map]').find('canvas.ol-layer').should('exist');
  });
  //TODO
  /*it('Is dots layer present', () => {
    cy.intercept('GET', 'http://192.168.1.34:31501/rest/usagePoints?*', {
      body: [
        {
          id: 20167,
          address: 'SRBIJA > BATOČINA > 11000 > PRAHA > DUSANA VASILJEVA',
          customerKind: 'High voltage consumption',
          events: [],
          extUcode: '916886901',
          fromDt: '2022-01-02T23:00:00Z',
          lat: 17.88023,
          lon: 44.589694,
          name: null,
          notice: null,
          pricingStructure: 'High Voltage',
          ratedPower: 100,
          toDt: null,
          ucode: 'PRE-UP-3918',
          usageGroup: 'High voltage consumption',
          usagePointType: 'Distribution, consumer'
        }
      ],
      statusCode: 200
    }).as('fetchPoints');
    cy.visit('/map');
    cy.wait('@fetchPoints');
    cy.get('[data-cy=map]').find('canvas.dots-layer').should('exist');
  });*/
});
