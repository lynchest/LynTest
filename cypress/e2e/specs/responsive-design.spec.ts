
/// <reference types="cypress" />

describe('Responsive Design E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display mobile layout on small screens', () => {
    cy.viewport(375, 667); // iPhone SE
    cy.contains('LynTest').should('be.visible');
    // Add assertions specific to mobile layout, e.g., element visibility, flex direction
  });

  it('should display desktop layout on large screens', () => {
    cy.viewport(1280, 800); // Desktop
    cy.contains('LynTest').should('be.visible');
    // Add assertions specific to desktop layout
  });
});
