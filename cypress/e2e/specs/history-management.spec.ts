
/// <reference types="cypress" />

describe('History Management E2E', () => {
  beforeEach(() => {
    cy.visit('/');
    // Clear history before each test to ensure a clean state
    cy.window().then((win) => {
      win.localStorage.removeItem('typingHistory');
    });
  });

  it('should display "No tests completed yet" when history is empty', () => {
    cy.contains('No tests completed yet').should('be.visible');
  });

  it('should add a completed test to history', () => {
    cy.contains('Start Test').click();
    // Type enough words to complete the test (assuming 15 words for 60 seconds)
    const words = 'the quick brown fox jumps over the lazy dog and then some more words'.split(' ');
    for (let i = 0; i < 15; i++) {
      cy.get('input[placeholder="Type the text above..."]').type(words[i] + ' ');
    }

    // Wait for the test to complete (60 seconds)
    cy.wait(60000);

    cy.contains('Test Complete!').should('be.visible');
    cy.contains('WPM').should('be.visible');
    cy.contains('Accuracy').should('be.visible');
    cy.contains('Recent Tests').should('be.visible');
    cy.get('[role="listitem"]').should('have.length.at.least', 1);
  });
});
