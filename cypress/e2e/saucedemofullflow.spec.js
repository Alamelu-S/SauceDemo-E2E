describe('Checkout Flow Test',()=>
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
  it('Add multiple products to cart dynamically and checkout',()=>
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

      // Checkout
      cy.get('[data-test=checkout]').click();
      cy.get('[data-test=firstName]').type('John');
      cy.get('[data-test=lastName]').type('Doe');
      cy.get('[data-test=postalCode]').type('12345');
      cy.get('[data-test=continue]').click();

      // Verify items in overview
      cy.get('.cart_item').should('have.length', productsItem.length);

      // Finish checkout
      cy.get('[data-test=finish]').click();

        // Verify success message
        cy.contains('Thank you for your order!').should('be.visible');
    //Logout
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('include', 'saucedemo.com');

    });
  });

  });