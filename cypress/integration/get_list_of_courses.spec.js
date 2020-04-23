import { logInWithEmailAndPassword } from '../functions'

describe('Course page', () => {
  it('displays a list of user courses', () => {
    cy.visit('http://localhost:3000/login')

    logInWithEmailAndPassword()

    cy.get('[data-test="navbar"]')

    cy.get('[data-test="courses-tab-button"]').click()

    cy.get('[data-test="courses-header"]').contains('My courses')

    cy.get('[data-test="courses-list"]')
      .children()
      .should('have.length', 2)
  })
})
