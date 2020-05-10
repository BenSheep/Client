import {
  logInWithEmailAndPassword,
  goToCoursesPage,
  goToCourseDetailsPage,
} from '../functions'
import { FIRST_COURSE_NAME } from '../messages'

const PROFESSOR_NAME = 'John Doe'
const COURSE_GRADE = 8

describe('Courses page', () => {
  it('Edits the information of a course', () => {
    cy.visit('http://localhost:3000/login')

    logInWithEmailAndPassword()

    goToCoursesPage()

    goToCourseDetailsPage(1, FIRST_COURSE_NAME, true)

    clickEditButton()

    editCourseInfo()

    stubSaveChanges()
    saveChanges()

    makeSureChangesPersisted()
  })
})

const editCourseInfo = () => {
  editProfessorsName()
  editGrade()
  editCourseTime()
}

const clickEditButton = () => {
  cy.get('[data-test="edit-course-button"]').click()
  cy.get('[data-test="edit-course-button"]').should('not.be.visible')
  cy.get('[data-test="save-button"').should('be.visible')
}

const editProfessorsName = () => {
  cy.get('[data-test="professor-name-input"]').should('have.value', '')

  cy.get('[data-test="professor-name-input"]')
    .clear()
    .type(PROFESSOR_NAME)
}

const editGrade = () => {
  cy.get('[data-test="grade-input"]').should('have.value', '')

  cy.get('[data-test="grade-input"]')
    .clear()
    .type(COURSE_GRADE)
}

const editCourseTime = () => {
  cy.get('[data-test="schedule-time-input"]')
    .clear()
    .type('14:00')
}

const saveChanges = () => {
  cy.get('[data-test="save-button"]').click()
  cy.get('[data-test="save-button"]').should('not.be.visible')
  cy.get('[data-test="edit-course-button"]').should('be.visible')
}

const makeSureChangesPersisted = () => {
  goToCoursesPage()
  goToCourseDetailsPage(1, FIRST_COURSE_NAME, true)

  cy.get('[data-test="course-professor"]').contains(PROFESSOR_NAME)
  cy.get('[data-test="course-grade"]').contains(COURSE_GRADE)
  cy.get('[data-test="schedule-time"]').contains('14:00')
}

const stubSaveChanges = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: null,
      data: {
        updatedCourse: {
          name: FIRST_COURSE_NAME,
          schedule: [
            {
              day: 3,
              start: 840,
              // end: 660,
            },
          ],
          professor: PROFESSOR_NAME,
          grade: COURSE_GRADE,
        },
      },
    },
  })
}
