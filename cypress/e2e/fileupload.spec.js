import 'cypress-file-upload';
describe('File Upload Test', () => 
    {
  it('uploads a file successfully', () => 
    {
    // Visit page with file input
    cy.visit('https://the-internet.herokuapp.com/upload');

    // Upload file from fixtures
    cy.get('input[type="file"]').attachFile('Sample.txt');

    // Click upload button
    cy.get('#file-submit').click();

    // Validate upload success
    cy.contains('File Uploaded!').should('be.visible');
  });
});
