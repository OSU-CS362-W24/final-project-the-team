// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
<<<<<<< HEAD
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
require("@testing-library/cypress/add-commands")

// Add xy coordinate input field
Cypress.Commands.add('addXY', function(row, x_value, y_value) {
    // Check if current row isn't 0 (since by default there is one row already)
    if (row != 0) {
        // Click add values button for input
        cy.get("#add-values-btn").click()
    }
    // Fill XY coordinates with a given user value
    cy.get(".x-value-input").eq(row).type(x_value)
    cy.get(".y-value-input").eq(row).type(y_value)

})

// Fill User Inputs
Cypress.Commands.add('fillInputs', function() {
    
    // Fill User Inputs with values for testing: Title, Color, X & Y Label
    cy.get("#chart-title-input").type("Cats vs. Dogs")
    cy.get("#chart-color-input").invoke("val", "#0000ff").trigger("change")
    cy.get("#x-label-input").type("Cats")
    cy.get("#y-label-input").type("Dogs")

    // Add XY Coordinates
    cy.addXY(0, 1, 3)
    cy.addXY(1, 2, 7)
    cy.addXY(2, 3, 15)
    cy.addXY(3, 4, 25)
    cy.addXY(4, 5, 40)
})
=======
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
>>>>>>> e5422d895746a5b19b3a46081a86fd7e48f588fe
