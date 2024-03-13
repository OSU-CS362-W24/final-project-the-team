it("Visits Chart Webpage", function() {
  cy.visit("/")
})

it("Chart is correctly generated", function() {
  cy.visit("/")
  cy.findByRole("link", { name: "Line"}).click()
  cy.get("#chart-title-input").type("Cats vs. Dogs")

  cy.get("#chart-color-input").invoke("val", "#0000ff").trigger("change")

  cy.get("#x-label-input").type("Cats")
  cy.get("#y-label-input").type("Dogs")

  cy.addXY(0, 1, 3)
  cy.addXY(1, 2, 7)
  cy.addXY(2, 3, 15)
  cy.addXY(3, 4, 25)
  cy.addXY(4, 5, 40)

  cy.get("#add-values-btn").click()  
  cy.get("#generate-chart-btn").click()

  cy.get("#chart-img").should("exist")

})