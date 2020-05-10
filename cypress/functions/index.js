import { USER_EMAIL, USER_PASSWORD } from '../messages'

export const logInWithEmailAndPassword = () => {
  cy.visit('http://localhost:3000/login')
  stubSuccessfulLogin()
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
  stubGetCourses()
  cy.get('[data-test="navbar"]')

  cy.get('[data-test="courses-tab-button"]').click()

  cy.get('[data-test="courses-header"]').contains('My Courses')

  cy.get('[data-test="courses-list"]')
}

export const goToCourseDetailsPage = (index, courseName, shouldISeeIt) => {
  stubGetCourseDetails(courseName, shouldISeeIt)

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

export const stubSuccessfulLogin = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: null,
      data: {
        login: {
          token: 'somerandomjwttoken',
        },
      },
    },
  })
}

export const stubSuccessfulSignup = email => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: null,
      data: {
        register: {
          email,
        },
        login: {
          token: 'sometoken',
        },
      },
    },
  })
}

export const stubWrongPasswordLogin = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: [
        {
          error: 'INCORRECT_PASSWORD',
          message: 'Password is incorrect',
          status: 401,
        },
      ],
      data: null,
    },
  })
}

export const stubUserNotFound = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: [
        {
          error: 'USER_DOES_NOT_EXIST',
          message: 'We did not find a user matching these credentials',
          status: 404,
        },
      ],
      data: null,
    },
  })
}

export const stubDuplicateEmail = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: [
        {
          error: 'DUPLICATE_EMAIL',
          message: 'This email is already in use',
          status: 409,
        },
      ],
      data: null,
    },
  })
}

export const stubGetCourses = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: null,
      data: {
        myCourses: [
          {
            name: 'French translation',
            schedule: [
              {
                day: 3,
              },
            ],
          },
          {
            name: 'Networks',
            schedule: [],
          },
        ],
      },
    },
  })
}

export const stubGetCourseDetails = (courseName, hasGrade) => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/graphql',
    response: {
      errors: null,
      data: {
        course: {
          name: courseName,
          schedule: [
            {
              day: 3,
              start: 540,
              end: 660,
            },
          ],
          professor: 'Mr. Prof',
          grade: hasGrade ? 9 : null,
        },
      },
    },
  })
}
