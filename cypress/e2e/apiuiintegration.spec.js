describe('API & UI Integration Test',()=>
{
    let apiProductName;
    
      // 1️⃣ Step 1: Get a product name from API
        before(() => {
        cy.request('GET', 'https://fakestoreapi.com/products/1').then((response) =>
         {
            expect(response.status).to.eq(200);
            apiProductName = response.body.title;
            cy.log(`Product name from API: ${apiProductName}`);
 
         });
        });

        // 2️⃣ Step 2: Use that data in the UI
  it.skip('should verify product name in SauceDemo UI', () => {
    // Visit SauceDemo and log in
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // 3️⃣ Step 3: Verify product names are visible
    cy.get('.inventory_item_name').should('be.visible');

    // 4️⃣ Step 4: Check if any product name includes part of the API product name
    cy.get('.inventory_item_name').then(($els) => {
      const uiNames = [...$els].map(el => el.innerText.toLowerCase());
      const apiNameLower = apiProductName.toLowerCase().split(' ')[0]; // use first word for loose match
      const matchFound = uiNames.some(name => name.includes(apiNameLower));

      cy.log(`Checking if API product "${apiProductName}" matches any UI name`);
      expect(matchFound, `API product "${apiProductName}" should appear in UI`).to.be.true;
    });

});

});