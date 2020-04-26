import {
  logInWithEmailAndPassword,
  goToCoursesPage,
  goToCourseDetailsPage,
  checkBasicCourseInformation,
} from '../functions'

const courseName = 'French translation'
const otherCourseName = 'Networks'

describe('Courses page', () => {
  it('displays a list of user courses', () => {
    cy.visit('http://localhost:3000/login')

    logInWithEmailAndPassword()
    goToCoursesPage()
    goToCourseDetailsPage(1, courseName)
    checkBasicCourseInformation(courseName, false)
    goToCoursesPage()
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
