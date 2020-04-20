import { getCourses, STORE_COURSES } from '~/store/actions/coursesActions'
import api from '~/store/api'
jest.mock('../../store/api')

describe('Courses actions', () => {
  describe('Get courses', () => {
    it('stores courses retrieved from the API', () => {
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

      const dispatch = jest.fn()

      api.post.mockResolvedValue({
        data: {
          errors: null,
          data: {
            myCourses: courses,
          },
        },
      })

      return getCourses('token')(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: STORE_COURSES,
          courses,
        })
      })
    })
  })
})
