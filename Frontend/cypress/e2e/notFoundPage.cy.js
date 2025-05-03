describe('NotFound Page Test', () => {
  it('should load the 404 error page correctly', () => {
    // Visit the NotFound page (update URL if it's different in your app)
    cy.visit('http://localhost:5173/non-existent-page'); // Assuming you have a route that shows this page

    // Verify the "404 error" text is present
    cy.contains('404 error').should('be.visible');

    // Verify the "Page not found" heading is displayed
    cy.contains('Page not found').should('be.visible');

    // Verify the "Sorry, the page you are looking for doesn't exist." text is present
    cy.contains("Sorry, the page you are looking for doesn't exist.").should('be.visible');

    // Verify the "Go back" button exists and is clickable
    cy.get('button').contains('Go back').should('be.visible').click();
  });
});
