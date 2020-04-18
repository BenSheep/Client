describe('smoke test', () => {
  it('makes sure cypress is fine', () => {
    cy.visit('localhost:3000')

    cy.get('[data-test="sign-up-button"]').click()

    cy.get('[data-test="email-input"]')
      .focus()
      .type('test@email.com')

    cy.get('[data-test="password-input"]')
      .focus()
      .type('safepassword123')

    cy.get('[data-test="submit"]').click()

    // cy.get('[data-test="email-input"]').should('not.be.visible')
  })
})
