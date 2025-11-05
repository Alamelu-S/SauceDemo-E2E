describe('API Testing Examples',()=>
{
    let userId; // store userId for PUT / DELETE 
    //1.Fetch Prodcut : GET
    it('GET Products',()=>
    {
        cy.request('GET','https://fakestoreapi.com/products/1').then((response) => 
        {
            expect(response.status).eq(200);
            cy.log(JSON.stringify(response.body));
            expect(response.body).to.have.property('id',1);
            expect(response.body).to.have.property('title');
            expect(response.body).to.be.an('object');

            //expect(response.body).to.have.length.greaterThan(0);
        })
    })

    //2.POST - create new user
    it('POST Create new user',()=>
    {
        cy.request('POST', 'https://fakestoreapi.com/users', 
            {
                email: 'john@example.com',
                username: 'john123',
                password: 'secret123',
                name: { firstname: 'John', lastname: 'Doe' },

             }).then((response) => {
                // Some responses return 200, others 201
                expect([200, 201]).to.include(response.status);
                expect(response.body).to.have.property('id');
                userId = response.body.id;
                cy.log(`User created ID:${userId}`);

    })
});

    //3.PUT : Update user
    it('PUT Update user',()=>
    {
        cy.request('PUT',`https://fakestoreapi.com/users/${userId}`,
        {
            email: 'john_updated@example.com',
            username: 'john_updated',
            password: 'newpass123',
        }).then((response)=>
        {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('email', 'john_updated@example.com');
            cy.log(`User updated with ID: ${userId}`);
        });
    });

    // 4️⃣ DELETE - Delete the user
  it('DELETE - Delete the created user', () => {
    cy.request('DELETE', `https://fakestoreapi.com/users/${userId}`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`User deleted with ID: ${userId}`);
    });
  });
});