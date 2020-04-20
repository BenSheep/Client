import coursesReducer from '../../store/reducers/coursesReducer'
import { STORE_COURSES } from '~/store/actions/coursesActions'

describe('STORE_COURSES', () => {
  it('Stores the courses for the logged in user', () => {
    const state = {}

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

    const result = coursesReducer(state, {
      type: STORE_COURSES,
      courses,
    })

    expect(result).toEqual(courses)
  })
})
