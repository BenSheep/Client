import {
  logInWithEmailAndPassword,
  goToCoursesPage,
  goToCourseDetailsPage,
  checkBasicCourseInformation,
} from '../functions'

import { FIRST_COURSE_NAME, OTHER_COURSE_NAME } from '../messages'

describe('Courses page', () => {
  it("Displays the details of a user's course", () => {
    cy.visit('http://localhost:3000/login')

    logInWithEmailAndPassword()

    goToCoursesPage()

    goToCourseDetailsPage(1, FIRST_COURSE_NAME, false)
    checkBasicCourseInformation(FIRST_COURSE_NAME, false)

    goToCoursesPage()

    goToCourseDetailsPage(2, OTHER_COURSE_NAME, true)

    checkBasicCourseInformation(OTHER_COURSE_NAME, true)
    checkAdditionalCourseInformation()
  })
})

const checkAdditionalCourseInformation = () => {
  cy.get('[data-test="course-professor-header"]')
  cy.get('[data-test="course-grade-header"]')
  cy.get('[data-test="course-grade"]').contains(9)
}
