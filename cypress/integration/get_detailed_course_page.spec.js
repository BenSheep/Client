import {
  logInWithEmailAndPassword,
  goToCoursesPage,
  goToCourseDetailsPage,
  checkBasicCourseInformation,
} from '../functions'

const courseName = 'French translation'
const otherCourseName = 'Networks'

describe('Courses page', () => {
  it("Displays the details of a user's course", () => {
    cy.visit('http://localhost:3000/login')

    logInWithEmailAndPassword()

    goToCoursesPage()

    goToCourseDetailsPage(1, courseName, false)
    checkBasicCourseInformation(courseName, false)

    goToCoursesPage()

    goToCourseDetailsPage(2, otherCourseName, true)

    checkBasicCourseInformation(otherCourseName, true)
    checkAdditionalCourseInformation()
  })
})

const checkAdditionalCourseInformation = () => {
  cy.get('[data-test="course-professor-header"]')
  cy.get('[data-test="course-grade-header"]')
  cy.get('[data-test="course-grade"]').contains(9)
}
