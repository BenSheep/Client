import {
  getCourses,
  getCourseByName,
  deleteDetailedCourse,
  STORE_COURSES,
  STORE_COURSE_DETAILS,
  REMOVE_COURSE_DETAILS,
} from '~/store/actions/coursesActions'
import api from '~/store/api'
jest.mock('../../store/api')

describe('Courses actions', () => {
  describe('Courses', () => {
    it('stores courses retrieved from the API', () => {
      const courses = [
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
  describe('Course details', () => {
    let course

    beforeEach(() => {
      course = {
        name: 'French translation',
        schedule: [
          {
            day: 3,
          },
        ],
        professor: null,
      }
    })

    it("store a course's details retireved from the API", () => {
      const dispatch = jest.fn()

      api.post.mockResolvedValue({
        data: {
          errors: null,
          data: {
            course,
          },
        },
      })

      return getCourseByName('token', 'French translation')(dispatch).then(
        () => {
          expect(dispatch).toHaveBeenCalledWith({
            type: STORE_COURSE_DETAILS,
            course,
          })
        }
      )
    }),
      it("deletes a course's details from the store", () => {
        const expectedAction = {
          type: REMOVE_COURSE_DETAILS,
          course,
        }

        expect(deleteDetailedCourse(course)).toEqual(expectedAction)
      })
  })
})
