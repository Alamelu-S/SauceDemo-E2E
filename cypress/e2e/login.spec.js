describe('Login Test', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/') // replace with your OpenCart URL if needed
  })

  it('should login successfully using fixture data', () => 
    {
    cy.fixture('loginData').then((data) => {
      cy.get('[data-test=username]').type(data.username)
      cy.get('[data-test=password]').type(data.password)
      cy.get('[data-test=login-button]').click()

      // verification: check if login was successful
      cy.url().should('include', 'inventory.html')
      cy.contains('Products').should('be.visible')
    })
  })

})
