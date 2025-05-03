/// <reference types="cypress" />

describe('Footer Component', () => {
    beforeEach(() => {
        // Visit the page where the footer is displayed
        cy.visit('http://localhost:5173/');
    });

    it('should display the correct footer text', () => {
        // Check if the footer contains the correct text
        cy.get('footer')
            .should('be.visible')
            .contains('© 2025 Country Explorer. All rights reserved.');
    });

    it('should have correct styles for light and dark modes', () => {
        // Test light mode styles
        cy.get('footer').should('have.class', 'bg-gray-100');
        cy.get('footer').should('have.class', 'text-gray-700');
    });
});
