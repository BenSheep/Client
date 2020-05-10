import {
  logInWithEmailAndPassword,
  goToCoursesPage,
  goToCourseDetailsPage,
} from '../functions'

import { FIRST_COURSE_NAME } from '../messages'

describe('Courses page', () => {
  it("Deletes a course from user's list", () => {
    logInWithEmailAndPassword()

    goToCoursesPage()

    goToCourseDetailsPage(1, FIRST_COURSE_NAME, true)

    pressDeleteNoVerify()

    stubDeleteCourse()
    pressDeleteVerify()

    goToCoursesPage(true)

    cy.get('[data-test="course-card"]')
      .contains(FIRST_COURSE_NAME)
      .should('not.exist')
  })
})

const pressDeleteNoVerify = () => {
  cy.get('[data-test="delete-course-button"').click()
  cy.get('[data-test="verify-alert-box"]').should('be.visible')
  cy.get('[data-test="no-button"]').click()

  cy.get('[data-test="verify-alert-box"]').should('not.be.visible')
}

const pressDeleteVerify = () => {
  cy.get('[data-test="delete-course-button"').click()
  cy.get('[data-test="verify-alert-box"]').should('be.visible')
  cy.get('[data-test="yes-button"]').click()

  cy.get('[data-test="verify-alert-box"]').should('not.be.visible')
}

const stubDeleteCourse = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: null,
      data: {
        deleteCourse: {},
      },
    },
  })
}
