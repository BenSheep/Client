import {
  logInWithEmailAndPassword,
  goToCoursesPage,
  goToCourseDetailsPage,
  checkBasicCourseInformation,
  stubSuccessfulLogin,
  stubGetCourses,
  stubGetCourseDetails,
} from '../functions'

const courseName = 'French translation'
const otherCourseName = 'Networks'

describe('Courses page', () => {
  it("Displays the details of a user's course", () => {
    cy.visit('http://localhost:3000/login')

    stubSuccessfulLogin()
    logInWithEmailAndPassword()

    stubGetCourses()
    goToCoursesPage()

    stubGetCourseDetails('French translation', false)
    goToCourseDetailsPage(1, courseName)
    checkBasicCourseInformation(courseName, false)

    stubGetCourses()
    goToCoursesPage()

    stubGetCourseDetails('Networks', true)
    goToCourseDetailsPage(2, otherCourseName)

    checkBasicCourseInformation(otherCourseName, true)
    checkAdditionalCourseInformation()
  })
})

const checkAdditionalCourseInformation = () => {
  cy.get('[data-test="course-professor-header"]')
  cy.get('[data-test="course-grade-header"]')
  cy.get('[data-test="course-grade"]').contains(9)
}
