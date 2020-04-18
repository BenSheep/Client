describe('smoke test', () => {
  it('makes sure cypress is fine', () => {
    cy.visit('localhost:3000')

    cy.get('[data-test="sign-up-button"]')
  })
})
