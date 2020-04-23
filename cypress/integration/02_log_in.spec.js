import {
  USER_EMAIL,
  USER_PASSWORD,
  NON_EXISTENT_EMAIL,
  NON_EXISTENT_USERNAME,
  BAD_PASSWORD,
  WRONG_PASSWORD,
} from '../messages'

import { logInWithEmailAndPassword } from '../functions'
describe('Log in', () => {
  it("fails login a user in until it doesn't", () => {
    cy.visit('localhost:3000')

    cy.get('[data-test="sign-up-button"]').click()

    cy.get('[data-test="go-to-log-in"]').click()

    tryWrongPassword()

    tryNonExistentEmail()

    tryNonExistentUsername()

    logInWithEmailAndPassword()
  })
})

// tries both an invalid password (does not meet requirements) and a wrong password
const tryWrongPassword = () => {
  cy.get('[data-test="email-username-input"]')
    .focus()
    .clear()
    .type(USER_EMAIL)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(BAD_PASSWORD)

  cy.get('[data-test="submit"]').click()

  cy.get('[data-test="error-message"]').contains('Password must have at')

  cy.get('[data-test="email-username-input"]')
    .focus()
    .clear()
    .type(USER_EMAIL)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(WRONG_PASSWORD)

  cy.get('[data-test="submit"]').click()

  cy.get('[data-test="error-message"]').contains('Password is incorrect')
}

const tryNonExistentEmail = () => {
  cy.get('[data-test="email-username-input"]')
    .focus()
    .clear()
    .type(NON_EXISTENT_EMAIL)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(USER_PASSWORD)

  cy.get('[data-test="submit"]').click()

  cy.get('[data-test="error-message"]').contains('We did not find ')
}

const tryNonExistentUsername = () => {
  cy.get('[data-test="email-username-input"]')
    .focus()
    .clear()
    .type(NON_EXISTENT_USERNAME)

  cy.get('[data-test="password-input"]')
    .focus()
    .clear()
    .type(USER_PASSWORD)

  cy.get('[data-test="submit"]').click()

  cy.get('[data-test="error-message"]').contains('We did not find ')
}
