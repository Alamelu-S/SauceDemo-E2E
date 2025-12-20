describe('API using Fixtures',()=>{

    it('POST using Fixture',()=>
    {
        cy.fixture('createpostpayload').then((payload)=>
        {
       // cy.request('POST','https://jsonplaceholder.typicode.com/posts',payload)
        cy.request('POST',`${Cypress.env('apiBaseUrl')}/posts`,payload)
        .then((response)=>{
        expect(response.status).to.eq(201);
        expect(response.body.title).to.eq(payload.title);
        })
        })

        })
    })