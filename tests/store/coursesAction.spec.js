import {
  getCourses,
  getCourseByName,
  addCourse,
  updateCourseDetails,
  deleteCourse,
  deleteDetailedCourse,
  STORE_COURSES,
  STORE_COURSE_DETAILS,
  ADD_COURSE,
  REMOVE_COURSE,
  REMOVE_COURSE_DETAILS,
} from '~/store/actions/coursesActions'

import { FIRST_COURSE_NAME } from '../../cypress/messages'

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
    it('Sends addCourse request to API and stores new course', () => {
      const courseName = 'Databases'

      const course = {
        name: courseName,
      }
      const dispatch = jest.fn()

      api.post.mockResolvedValue({
        data: {
          errors: null,
          data: {
            addCourse: course,
          },
        },
      })

      return addCourse('token', courseName)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ADD_COURSE,
          course,
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
      it("Updates a course's details", () => {
        const updatedCourse = {
          name: FIRST_COURSE_NAME,
          professor: 'John Doe',
          grade: 8,
          scehdule: {
            start: 840,
          },
        }

        const dispatch = jest.fn()

        api.post.mockResolvedValue({
          data: {
            errors: null,
            data: {
              updatedCourse,
            },
          },
        })

        return updateCourseDetails('token', updatedCourse)(dispatch).then(
          () => {
            expect(dispatch).toHaveBeenCalledWith({
              type: STORE_COURSE_DETAILS,
              course: updatedCourse,
            })
          }
        )
      })
    it("Deletes a course from user's list", () => {
      const dispatch = jest.fn()

      api.post.mockResolvedValue({
        data: {
          errors: null,
          data: {
            deleteCourse,
          },
        },
      })
      return deleteCourse('token', course)(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledWith({
          type: REMOVE_COURSE,
          course,
        })
      })
    })
    it("deletes a course's details from the store", () => {
      const expectedAction = {
        type: REMOVE_COURSE_DETAILS,
        course,
      }

      expect(deleteDetailedCourse(course)).toEqual(expectedAction)
    })
  })
})
