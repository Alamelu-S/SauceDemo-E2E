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

  //Fail Testcase : Login Failed
  it.skip('Invalid Login Data', () => 
    {
      cy.get('[data-test=username]').type('admin')
      cy.get('[data-test=password]').type('admin')
      cy.get('[data-test=login-button]').click()

      // verification: user should remain on login page
      cy.url().should('include', 'saucedemo.com')

      // verification: error message is displayed
      cy.get('[data-test=error]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service')

      cy.reload();// it will clear the wrong data and reload the page 
    })
  
})
