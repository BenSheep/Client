import {
  STORE_COURSES,
  STORE_COURSE_DETAILS,
} from '~/store/actions/coursesActions'
const initialState = { courses: null, courseDetails: null }

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
    default:
      return state
  }
}
