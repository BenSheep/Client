describe('smoke test', () => {
  it('makes sure cypress is fine', () => {
    cy.visit('localhost:3000')

    cy.get('[data-test="sign-up-button"]').click()

    cy.get('[data-test="email-input"]')
      .focus()
      .type('test@email.com')
  })
})
