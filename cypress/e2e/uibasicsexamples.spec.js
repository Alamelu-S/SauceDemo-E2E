describe('UI Basics Workouts',()=>{

//Visiting Pages and Basic Assertions:
it.skip('Visit Page and Assertion Test',()=>
{
    cy.visit('https://www.saucedemo.com/');
    cy.url().should('include','saucedemo');
    cy.get('#user-name').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-button').should('be.enabled');
})    
//Enter Login detail
it.skip('Enter valid Credentials to login',()=>
{
     cy.visit('https://www.saucedemo.com/');
     cy.get('#user-name').type('standard_user');
     cy.get('#password').type('secret_sauce');
     cy.get('#login-button').click();
     cy.url().should('include', 'inventory.html')
     cy.get('.title').should('contain','Products');


})
//Checkbox and Radio buttons
it.skip('Chekboxes and Radio Button Test',()=>{

    cy.visit('https://www.tutorialspoint.com/selenium/practice/check-box.php');
    cy.get('#c_bs_1').check().should('be.checked');
    cy.get('#c_bs_1').uncheck().should('not.be.checked');

    //Radio Buttons
    cy.visit('https://www.tutorialspoint.com/selenium/practice/radio-button.php');
    //By type = radio and name and giving value 
    //cy.get('input[type="radio"][name="tab"]').check('igotthree').should('be.checked');
    //OR below also works
    //cy.get('input[type="radio"][value="igottwo"]').check().should('be.checked');
    //OR by index (if u dont the value)
    cy.get('input[name="tab"]').eq(1).check()  // selects second radio
    
})

Cypress.on('uncaught:exception', () => {
  return false;
}); //This code prevents cypress uncaught exception bz of the application not cypress.. //This error is coming from the application, not from your Cypress code.
//By default, Cypress fails the test if the app throws an uncaught exception.


it.skip('Dropdown and Select Test', () => {
  cy.visit('https://www.tutorialspoint.com/selenium/practice/select-menu.php');

  cy.get('#inputGroupSelect03').select('Ms.');
  cy.get('#inputGroupSelect03').should('have.value', '3');
//OR checking by text
  //cy.get('#inputGroupSelect03 option:selected')
  //.should('have.text', 'Ms.');

});

//Alerts and COnfirm
it('Alert and Confirm Test',()=>
{
cy.visit('https://www.tutorialspoint.com/selenium/practice/alerts.php');

//simple alert
cy.on('window:alert',(text)=>{
expect(text).to.eq('Hello world!');
}) //this should be always before alert click

cy.get('button[onclick="showAlert()"]').click();

//alert appear after 5 seconds 

/*cy.get('button[onclick="myMessage()"]').click();

cy.on('window:alert',(textClickMe)=>{
expect(textClickMe).to.eq('Hello just appeared');
})*/

//Confirm Ok and Cancel
cy.get('button[onclick="myDesk()"]').click();

cy.on('window:confirm',(confirmText)=>{
expect(confirmText).to.eq('Press a button!');
return true;
})

//cy.on('window:confirm',()=> false);

//Prompt alert
/*
cy.get('button[onclick="myPrompt()"]').click();
cy.window().then((win) => {
    cy.stub(win, 'prompt').returns('Cypress User');
  });

  

  cy.get('#promptdemo')
    .should('contain.text', 'Cypress User');

}) */


})
})