describe('Register Page Test', () => {
  it('should load the register page and display register form', () => {
    // Visit the register page (adjust the path if needed)
    cy.visit('http://localhost:5173/register'); // Make sure the correct route is used for register page

    // Verify the "Register" heading is visible
    // cy.contains('Register').should('be.visible');

    // Verify the input fields are visible
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');

    // Verify the "Register" button is visible
    cy.get('button').contains('Register').should('be.visible');
  });

  it('should allow a user to register with valid credentials', () => {
    // Visit the register page
    cy.visit('http://localhost:5173/register');

    // Enter valid email and password
    cy.get('input[type="email"]').type('newuser@example.com');
    cy.get('input[type="password"]').type('newpassword');

    // Submit the form
    cy.get('button').contains('Register').click();

    // Verify if the user is redirected to the login page after successful registration
    cy.url().should('eq', 'http://localhost:5173/register'); // Adjust the URL if your login page URL is different

    // Optionally, verify if a success toast message appears
    // cy.get('.react-toast-notifications').should('contain', 'Email is already registered.');
  });

  it('should show error for failed registration', () => {
    // Visit the register page
    cy.visit('http://localhost:5173/register');

    // Enter invalid email and password (for example, email already exists)
    cy.get('input[type="email"]').type('existinguser@example.com');
    cy.get('input[type="password"]').type('password');

    // Submit the form
    cy.get('button').contains('Register').click();

    // Verify if the error toast message appears
    // cy.get('.react-toast-notifications').should('contain', 'Error'); // You may need to adjust the exact error message based on your API
  });

  it('should navigate to the login page when "Login" is clicked', () => {
    // Visit the register page
    cy.visit('http://localhost:5173/register');

    // Click on the "Login" link
    cy.get('button').contains('Login').click();

    // Verify that the user is navigated to the login page
    cy.url().should('eq', 'http://localhost:5173/login');
  });
});
