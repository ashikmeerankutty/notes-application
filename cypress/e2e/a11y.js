/// <reference types="Cypress" />

describe('a11y tests', () => {
  beforeEach(() => {
    cy.visit('/').injectAxe();
  });

  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y();
  });
});
