describe('template spec', function() {
    it('passes', function() {
      cy.visit('https://example.cypress.io')
      cy.contains("dblclick").click()
  
      // example.cypress.io/commands/actions
      cy.url().should("include", "/commands/actions")
    })
  })