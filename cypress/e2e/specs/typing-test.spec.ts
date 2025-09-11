
/// <reference types="cypress" />

describe('Typing Test E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should start the test and allow typing', () => {
    cy.contains('Start Test').click();
    cy.get('input[placeholder="Type the text above..."]').should('be.visible');
    cy.get('input[placeholder="Type the text above..."]').type('hello world ');
    cy.contains('WPM').should('be.visible');
  });

  it('should restart the test', () => {
    cy.contains('Start Test').click();
    cy.get('input[placeholder="Type the text above..."]').type('some text ');
    cy.contains('Restart').click();
    cy.contains('Start Test').should('be.visible');
  });

  it('should change language', () => {
    cy.contains('EN').click();
    cy.contains('TR').should('be.visible');
    cy.contains('Yazmaya başlamak için Başlat'a tıklayın...').should('be.visible');
  });
});
