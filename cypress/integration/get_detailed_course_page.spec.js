import { logInWithEmailAndPassword } from '../functions'

const courseName = 'French translation'

describe('User application index page', () => {
  it('displays a list of user courses', () => {
    cy.visit('http://localhost:3000/login')

    logInWithEmailAndPassword()
    goToCoursesPage()
    goToCourseDetailsPage()
  })
})

const goToCoursesPage = () => {
  cy.get('[data-test="navbar"]')

  cy.get('[data-test="courses-tab-button"]').click()

  cy.get('[data-test="courses-header"]').contains('My courses')

  cy.get('[data-test="courses-list"]')
    .children()
    .should('have.length', 2)
}

const goToCourseDetailsPage = () => {
  cy.get('[data-test="course-card"]')
    .first()
    .find('[data-test="course-name"]')
    .click()

  cy.get('[data-test="course-detail-card"]')

  cy.get('[data-test="course-name"]').contains(courseName)
}
