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

export const goToCoursesPage = () => {
  cy.get('[data-test="navbar"]')

  cy.get('[data-test="courses-tab-button"]').click()

  cy.get('[data-test="courses-header"]').contains('My Courses')

  cy.get('[data-test="courses-list"]')
    .children()
    .should('have.length', 2)
}

export const goToCourseDetailsPage = (index, courseName) => {
  if (index === 1) {
    cy.get('[data-test="course-card"]')
      .first()
      .find('[data-test="course-name"]')
      .click()
  } else {
    cy.get('[data-test="course-card"]')
      .last()
      .find('[data-test="course-name"]')
      .click()
  }
}

export const checkBasicCourseInformation = (courseName, shouldISeeIt) => {
  cy.get('[data-test="course-detail-card"]')

  cy.get('[data-test="course-name"]').contains(courseName)

  if (shouldISeeIt) {
    cy.get('[data-test="course-grade"]').should('be.visible')
  } else {
    cy.get('[data-test="course-grade"]').should('not.be.visible')
  }
}
