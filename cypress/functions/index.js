import { USER_EMAIL, USER_PASSWORD } from '../messages'

export const logInWithEmailAndPassword = () => {
  cy.get('[data-test="email-username-input"]')
    .focus()
    .clear()
    .type(USER_EMAIL)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(USER_PASSWORD)

  cy.get('[data-test="submit"]').click()

  cy.get('[data-test="navbar"]')
}
