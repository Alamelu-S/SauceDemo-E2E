describe('FakeStore API CRUD Tests', () => {
  
  let userId; // will store the created user’s id

  // 1️⃣ GET – Read product
  it('GET - Fetch a single product', () => {
    cy.request('GET', 'https://fakestoreapi.com/products/1').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('title');
      cy.log(`Fetched product: ${response.body.title}`);
    });
  });

  // 2️⃣ POST – Create a new user
  it('POST - Create a new user', () => {
    cy.request('POST', 'https://fakestoreapi.com/users', {
      email: 'john@example.com',
      username: 'john123',
      password: 'secret123',
      name: { firstname: 'John', lastname: 'Doe' },
      address: {
        city: 'San Francisco',
        street: 'Market St',
        number: 123,
        zipcode: '94103',
      },
      phone: '123-456-7890'
    }).then((response) => {
      // API might return 200 or 201
      expect([200, 201]).to.include(response.status);
      expect(response.body).to.have.property('id');
      userId = response.body.id;
      cy.log(`User created with ID: ${userId}`);
    });
  });

  // 3️⃣ PUT – Update the user
  it('PUT - Update the created user', () => {
    cy.request('PUT', `https://fakestoreapi.com/users/${userId}`, {
      email: 'john_updated@example.com',
      username: 'john_updated',
      name: { firstname: 'John', lastname: 'Updated' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('email', 'john_updated@example.com');
      cy.log(`Updated user ID: ${userId}`);
    });
  });

  // 4️⃣ DELETE – Remove the user
  it('DELETE - Delete the created user', () => {
    cy.request('DELETE', `https://fakestoreapi.com/users/${userId}`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`Deleted user ID: ${userId}`);
    });
  });

});
