describe('Simple Cypress Report Test',()=>{

it('UI-Login Page Load Test',()=>{
    cy.visit('/');//It will take base url remaining
    cy.get('[data-test="login-button"]').should('be.visible');
});

it('API -Get Test',()=>{
    cy.request(`${Cypress.env('apiBaseUrl')}/posts/1`).then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id',1);
    })
})
})