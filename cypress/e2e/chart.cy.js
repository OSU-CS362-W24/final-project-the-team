it("Visits Chart Webpage", function() {
  cy.visit("/")
})

it("Chart is correctly generated", function() {
  // Visit homepage and click Line link
  cy.visit("/")
  cy.findByRole("link", { name: "Line"}).click()
  
  // Input fields filled in by user: Title, Color, X-Label, Y-Label
  cy.get("#chart-title-input").type("Cats vs. Dogs")
  cy.get("#chart-color-input").invoke("val", "#0000ff").trigger("change")
  cy.get("#x-label-input").type("Cats")
  cy.get("#y-label-input").type("Dogs")

  // XY Coordinate Inputs for chart
  cy.addXY(0, 1, 3)
  cy.addXY(1, 2, 7)
  cy.addXY(2, 3, 15)
  cy.addXY(3, 4, 25)
  cy.addXY(4, 5, 40)

  // Generate Chart 
  cy.get("#generate-chart-btn").click()

  // Assert: Check if an image exists in the DOM
  cy.get("#chart-img").should("exist")
})


it("Chart data is maintained across pages", function() {
  // Visit homepage and click Line link
  cy.visit("/")
  cy.findByRole("link", { name: "Line"}).click()

  // Fill Inputs Command to fill input fields
  cy.fillInputs()

  // Click on Scatter Link
  cy.findByRole("link", { name: "Scatter"}).click()

  // Asssert

  // Verify that values were maintained on different page (scatter page)
  cy.get("#chart-title-input").should('have.value', 'Cats vs. Dogs')
  cy.get("#chart-color-input").should("have.value", "#0000ff")
  cy.get("#x-label-input").should("have.value", "Cats")
  cy.get("#y-label-input").should("have.value", "Dogs")

  // Verify that XY coordinates input fields exist
  for (let i = 0; i < 5; i++) {
    cy.get(".x-value-input").eq(i).should("exist")
    cy.get(".y-value-input").eq(i).should("exist")
  }
})


it("Saving a chart to the 'gallery'", function() {
  // Visit homepage and click Line link
  cy.visit("/")
  cy.findByRole("link", { name: "Line"}).click()

  // Fill Inputs Command to fill input fields
  cy.fillInputs()

  // Generate Chart and then Click Save Chart Button 
  cy.get("#generate-chart-btn").click()
  cy.get("#save-chart-btn").click()

  // Click Gallery Link to check if generated chart is present
  cy.findByRole("link", { name: "Gallery"}).click()

  // Assert: Check if Title of chart exists within DOM 
  cy.findByText("Cats vs. Dogs").should("exist")
})


it("Re-opening a saved chart", function() {
  // Visit homepage and click Line link
  cy.visit("/")
  cy.findByRole("link", { name: "Line"}).click()

  // Fill Inputs Command to fill input fields
  cy.fillInputs()

  // Generate Chart and then Click Save Chart Button 
  cy.get("#generate-chart-btn").click()
  cy.get("#save-chart-btn").click()

  // Click Gallery Link to check if generated chart is present
  cy.findByRole("link", { name: "Gallery"}).click()
  // Click on Chart Image Link that is in the Gallery
  cy.get(".chart-img").click()

  // Asssert

  // Verify that image is displayed
  cy.get("#chart-img").should("exist")

  // Verify that values were maintained on different page (scatter page)
  cy.get("#chart-title-input").should('have.value', 'Cats vs. Dogs')
  cy.get("#chart-color-input").should("have.value", "#0000ff")
  cy.get("#x-label-input").should("have.value", "Cats")
  cy.get("#y-label-input").should("have.value", "Dogs")

  // Verify that XY coordinates input fields exist
  for (let i = 0; i < 5; i++) {
    cy.get(".x-value-input").eq(i).should("exist")
    cy.get(".y-value-input").eq(i).should("exist")
  }
  
})