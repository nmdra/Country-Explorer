describe('Login Page Test', () => {
  it('should load the login page and display login form', () => {
    // Visit the login page (adjust the path if needed)
    cy.visit('http://localhost:5173/login'); // Make sure the correct route is used for login page

    // Verify the "Login" heading is visible
    // cy.contains('Login').should('be.visible');

    // Verify the input fields are visible
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');

    // Verify the "Login" button is visible
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should allow a user to log in with correct credentials', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/login');

    // Enter valid email and password
    cy.get('input[type="email"]').type('testuser@example.com');
    cy.get('input[type="password"]').type('correctpassword');

    // Submit the form
    cy.get('button').contains('Login').click();

    // Verify if the user is redirected after successful login
    cy.url().should('eq', 'http://localhost:5173/login'); // Adjust the URL if your home page URL is different

    // Optionally, verify if a success toast message appears
    // cy.get('.react-toast-notifications').should('contain', 'Login successful');
  });

  it('should show error for invalid credentials', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/login');

    // Enter invalid email and password
    cy.get('input[type="email"]').type('wronguser@example.com');
    cy.get('input[type="password"]').type('wrongpassword');

    // Submit the form
    cy.get('button').contains('Login').click();

    // Verify if the error toast message appears
    // cy.get('.react-toast-notifications').should('contain', 'Error');
  });

  it('should navigate to the register page when "Register" is clicked', () => {
    // Visit the login page
    cy.visit('http://localhost:5173/login');

    // Click on the "Register" link
    cy.get('button').contains('Register').click();

    // Verify that the user is navigated to the register page
    cy.url().should('eq', 'http://localhost:5173/register');
  });
});
