import {
  STORE_COURSES,
  STORE_COURSE_DETAILS,
  ADD_COURSE,
  REMOVE_COURSE_DETAILS,
} from '~/store/actions/coursesActions'
const initialState = { courses: [], courseDetails: null }

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_COURSES: {
      const { courses } = action
      const newState = {
        ...state,
        courses: courses,
      }
      return newState
    }
    case STORE_COURSE_DETAILS: {
      const { course } = action
      const newState = {
        ...state,
        courseDetails: course,
      }
      return newState
    }
    case ADD_COURSE: {
      const { course } = action
      let newCourses

      if (state.courses) {
        newCourses = [...state.courses, course]
      } else {
        newCourses = [course]
      }

      return { ...state, courses: newCourses }
    }
    case REMOVE_COURSE_DETAILS:
      return { ...state, courseDetails: null }
    default:
      return state
  }
}
