describe('Dynamically Add Products to Cart',()=>
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

  //Add products to cart dynamically
  it('Add multiple products to cart dynamically',()=>
  {
    //load products from fixtures
    cy.fixture('products').then((data)=>
    {
        const productsItem = data.items;

        //add each product to cart
        productsItem.forEach(product => {
        cy.get(`[data-test=${product.id}]`).click();
      });
      // Verify cart badge shows correct number of items
      cy.get('[data-test=shopping-cart-badge]').should('contain', productsItem.length);

      // Open cart
      cy.get('.shopping_cart_link').click();

      // Verify each product is visible in the cart
      productsItem.forEach(product => {
        cy.contains('.inventory_item_name', product.name).should('be.visible');
      });
    });
  });
});