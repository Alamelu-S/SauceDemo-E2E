describe('API Spy Example', () => {

  it.skip('should spy on GET /posts/1 request', () => {

    // Intercept the GET request and give it an alias
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1').as('getPost')

    // Trigger the request via UI or directly
    cy.visit('https://jsonplaceholder.typicode.com/posts/1') // it will return JSON so will get error 

    // Wait for the request to complete and validate
    cy.wait('@getPost').then((interception) => {
      console.log(interception)  // check full request/response in browser console
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.have.property('id', 1)
    })

  })

  it('should GET /posts/1 using cy.request', () => {

    // Intercept the GET request
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1').as('getPost')

    // Send GET request directly (no cy.visit)
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id', 1)
    })

  })

})
