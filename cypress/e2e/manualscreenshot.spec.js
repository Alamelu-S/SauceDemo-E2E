describe('Manual Screenshot Test', () => {
  it('takes a screenshot', () => {
    cy.visit('https://example.cypress.io')

    // Full page screenshot
    cy.screenshot('homepage_full')

    // Screenshot of specific element
    cy.get('h1').screenshot('heading_only')
  })
})
