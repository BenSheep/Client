import coursesReducer from '../../store/reducers/coursesReducer'
import {
  STORE_COURSES,
  STORE_COURSE_DETAILS,
} from '~/store/actions/coursesActions'

describe('STORE_COURSES', () => {
  it('Stores the courses for the logged in user', () => {
    const state = { courses: null, courseDetails: null }
    const courses = [
      {
        name: 'French  translation',
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
    ]

    const returnedState = {
      courses,
      courseDetails: null,
    }

    const result = coursesReducer(state, {
      type: STORE_COURSES,
      courses,
    })

    expect(result).toEqual(returnedState)
  })
  it("Stores a course's details", () => {
    const state = { courses: null, courseDetails: null }
    const course = {
      name: 'French translation',
      schedule: [
        {
          day: 3,
        },
      ],
      professor: null,
    }

    const returnedState = {
      courses: null,
      courseDetails: course,
    }
    const result = coursesReducer(state, {
      type: STORE_COURSE_DETAILS,
      course,
    })

    expect(result).toEqual(returnedState)
  })
})
