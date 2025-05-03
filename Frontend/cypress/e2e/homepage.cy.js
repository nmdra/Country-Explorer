describe('Home Page Loading Test', () => {
  it('should load the home page successfully', () => {
    // Visit the home page
    cy.visit('http://localhost:5173/'); // Assuming the home page is at the root of the app

    // Assert that the page is loaded by checking the URL
    cy.url().should('eq', 'http://localhost:5173/'); // Adjust URL if different

  });

  it('should display loading state initially', () => {
    // Visit the home page
    cy.visit('http://localhost:5173/');
  });
});
