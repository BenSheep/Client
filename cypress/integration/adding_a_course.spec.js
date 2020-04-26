import { logInWithEmailAndPassword, goToCoursesPage } from '../functions'

const courseName = 'Databases'

describe('Courses page', () => {
  it('Adds a course for a user', () => {
    cy.visit('http://localhost:3000/login')

    logInWithEmailAndPassword()
    goToCoursesPage()
    stubAddCourse()
    checkModalNotShown()
    openAddCourseModal()
    checkModalShown()
    fillCourseInformationAndSubmit(courseName)
    checkModalNotShown()
    checkNewCourseShown(courseName)
  })
})

const stubAddCourse = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    headers: {
      Authorization: 'Bearer somejwttoken',
    },
    response: {
      errors: null,
      data: {
        addCourse: {
          name: courseName,
        },
      },
    },
  })
}

const checkModalNotShown = () => {
  cy.get('[data-test="add-course-modal"]').should('not.be.visible')
}

const checkModalShown = () => {
  cy.get('[data-test="course-name-input"]')
  cy.get('[data-test="submit"]')
}

const openAddCourseModal = () => {
  cy.get('[data-test="add-course-button"').click()
}

const fillCourseInformationAndSubmit = courseName => {
  cy.get('[data-test="course-name-input"]')
    .focus()
    .clear()
    .type(courseName)

  cy.get('[data-test="submit"]').click()
}

const checkNewCourseShown = courseName => {
  cy.contains(courseName)
}
