import { combineReducers } from 'redux'
import user from './userReducer'
import courses from './coursesReducer'

export default combineReducers({
  user,
  courses,
})
