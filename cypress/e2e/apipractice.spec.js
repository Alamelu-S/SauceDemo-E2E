describe('Test API Practice',()=>
{
    let responseID;
    //GET
    it('GET API Test',()=>
    {
        cy.request('GET',"https://jsonplaceholder.typicode.com/posts/1").then((response)=>{
        expect(response.status).to.eq(200);  
        expect(response.body).to.have.property('id',1);
        expect(response.body).to.have.property('title');
        //expect(response.body).to.be.an('object');

        cy.log(`Response body title : ${response.body.title}`);
       
        })

    })

    //POST method
    it('POST API Test',()=>
    {
        cy.request('POST','https://jsonplaceholder.typicode.com/posts',
        {
        title: 'Cypress API Testing',
        body: 'Learning POST API using Cypress',
        userId: 1
        }).then((response)=>{
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('userId',1);
        expect(response.body).to.have.property('title');
        expect(response.body.title).to.eq('Cypress API Testing');
        expect(response.body.body).to.eq('Learning POST API using Cypress');
        responseID = response.body.id;
        cy.log(`Response Title and ID: ${response.body.title},${responseID}`); 
        })

        })

        //PUT method - If we used responseID from POST Method then 500 server error.
        // Since there is no ID in server.So hardcorded to 1
        it('PUT API Test',()=>
        {
            cy.log(`ID in PUT method:: ${responseID}`);
            cy.request('PUT','https://jsonplaceholder.typicode.com/posts/1',
            {
                title: 'Updated Title',
                body: 'Updated body using Cypress PUT',
                userId: 1

            }).then((response)=>{
                expect(response.status).to.eq(200);

                cy.log(`Updated title in PUT method:: ${response.body.title}`);

            })

        })

        //PUT Method  : Show Negative Testing (Advanced)
        it('PUT Negative Test',()=>
        {

            cy.request({
                  method: 'PUT',
                  url: `https://jsonplaceholder.typicode.com/posts/${responseID}`,
                  failOnStatusCode: false,
                  body: {
                        title: 'Updated Title',
                        body: 'Updated Body',
                        userId: 1
                        }
                    }).then((response) => {
                    expect(response.status).to.eq(500)
                })
        })

        //GET - Negative Scenrio - Wrong API /Invalid API 
    it('GET Invalid API Test',()=>{

        cy.request({
            method:'GET',
            url:'https://jsonplaceholder.typicode.com/pos/1',
            failOnStatusCode: false
        }).then((response)=>{
        expect(response.status).to.be.oneOf([400,401,403,404,500]);

        })


        })
    })
