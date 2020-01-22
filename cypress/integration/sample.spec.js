describe('My First Test', function () {
  it('Visits the Kitchen Sink', function () {
    cy.visit('http://localhost:3000');

    cy.get('button').contains('Create A Resume').click();
  })
})