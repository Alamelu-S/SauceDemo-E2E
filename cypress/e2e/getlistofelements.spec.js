describe('Multiple Elements',()=>{

it('Get the List and Multiple elements Test',()=>{

//1.Login 
cy.visit('https://www.saucedemo.com/');
cy.get('[data-test=username]').type('standard_user');
cy.get('[data-test=password]').type('secret_sauce');
cy.get('[data-test=login-button]').click();

//2.Get List of Product names
cy.get('.inventory_item_name').each(($ele,index)=>{
const productName = $ele.text();
cy.log(`Product ${index + 1}: ${productName}`);
})
cy.get('.inventory_item_name').should('contain.text','Sauce Labs Backpack');
})    
})