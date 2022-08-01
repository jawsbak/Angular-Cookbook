describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have the title "Writing your first Cypress test"', () => {
    cy.title().should('eq', 'Writing your first Cypress test');
  });
});
