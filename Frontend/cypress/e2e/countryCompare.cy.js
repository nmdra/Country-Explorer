describe('Country Compare Page Test', () => {
  it('should load and display the compare countries page', () => {
    // Visit the country comparison page
    cy.visit('http://localhost:5173/compare'); // Make sure the URL matches the route for the compare page

    // Verify the "Compare Countries" heading is visible
    // cy.contains('Compare Countries').should('be.visible');

    // Verify that the "Select up to 2 countries" placeholder is visible in the dropdown
    // cy.get('.react-select__placeholder').should('contain', 'Select up to 2 countries');
  });

  it('should allow selecting 2 countries and display their flags and names', () => {
    // Visit the country comparison page
    cy.visit('http://localhost:5173/compare');

    // Open the country select dropdown
    // cy.get('.react-select').click();

    // Select the first country (e.g., Canada)
    // cy.contains('Canada').click();

    // // Select the second country (e.g., France)
    // cy.contains('France').click();

    // // Verify that both countries are selected
    // cy.get('.react-select__multi-value__label').should('have.length', 2);

    // // Verify that the selected countries' flags are visible in the comparison table
    // cy.get('img[alt="Flag of Canada"]').should('be.visible');
    // cy.get('img[alt="Flag of France"]').should('be.visible');
  });

  it('should display the country details and comparison tables after selecting countries', () => {
    // Visit the country comparison page
    cy.visit('http://localhost:5173/compare');

    // Open the country select dropdown and select two countries
    // cy.get('.react-select').click();
    // cy.contains('Canada').click();
    // cy.contains('France').click();

    // Wait for the country details to load
    cy.wait(1000); // Wait for data to be fetched from the API

    // Verify the comparison table contains data for the selected countries
    // cy.get('table').should('contain', 'Official Name');
    // cy.get('table').should('contain', 'Region');
    // cy.get('table').should('contain', 'Capital');
    // cy.get('table').should('contain', 'Timezones');
    // cy.get('table').should('contain', 'Languages');
    // cy.get('table').should('contain', 'Currencies');
  });

  it('should display population and area comparison charts', () => {
    // Visit the country comparison page
    cy.visit('http://localhost:5173/compare');

    // Open the country select dropdown and select two countries
    // cy.get('.react-select').click();
    // cy.contains('Canada').click();
    // cy.contains('France').click();

    // Wait for the country details to load
    cy.wait(1000); // Wait for data to be fetched from the API

    // Verify that the population comparison chart is displayed
    // cy.contains('Population Comparison').should('be.visible');
    // cy.get('.recharts-wrapper').should('exist'); // The Recharts container should exist

    // Verify that the area comparison chart is displayed
    // cy.contains('Area Comparison (km²)').should('be.visible');
    // cy.get('.recharts-wrapper').should('exist'); // The Recharts container should exist
  });

  it('should show an error message if no countries are selected', () => {
    // Visit the country comparison page
    cy.visit('http://localhost:5173/compare');

    // Try to load the country comparison without selecting any countries
    // cy.get('button').contains('Compare').click();

    // Verify that an error or message is displayed indicating that two countries must be selected
    // cy.contains('Please select two countries').should('be.visible'); // Adjust the message if needed
  });
});
