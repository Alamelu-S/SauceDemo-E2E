describe('',()=>
{
    beforeEach(() => 
    {
    cy.visit('https://www.saucedemo.com/') // replace with your OpenCart URL if needed
    cy.fixture('loginData').then((data) => {
    cy.get('[data-test=username]').type(data.username)
    cy.get('[data-test=password]').type(data.password)
    cy.get('[data-test=login-button]').click()

      // verification: check if login was successful
      cy.url().should('include', 'inventory.html')
      })
  })

  //Adding Single Item to cart:
  it.skip('Add Single Product to Cart',()=>
  {
    //Add Sauce Labs Backpack to Cart
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();

    //check that shopping cart badge shows 1 item:
    cy.get('[data-test=shopping-cart-badge]').should('contain','1');

    //Open cart and verify the item available or not:
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test=inventory-item-name]').should('contain','Sauce Labs Backpack');
    //or cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible')

  })

  //Adding Multiple Item to cart:
  it('Add Multiple Product to Cart',()=>
  {
    //Add Sauce Labs Backpack,sauce-labs-bike-light,sauce-labs-fleece-jacket to Cart
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click();
    cy.get('[data-test=add-to-cart-sauce-labs-bike-light]').click();
    cy.get('[data-test=add-to-cart-sauce-labs-fleece-jacket]').click();

    //check that shopping cart badge shows 1 item:
    cy.get('[data-test=shopping-cart-badge]').should('contain','3');

    //Open cart and verify the item available or not:
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test=inventory-item-name]').should('contain','Sauce Labs Backpack');
    //or cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should('be.visible')
    cy.get('[data-test=inventory-item-name]').should('contain','Sauce Labs Bike Light');
    cy.get('[data-test=inventory-item-name]').should('contain','Sauce Labs Fleece Jacket');

  })
})