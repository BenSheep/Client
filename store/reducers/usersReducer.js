import { SIGN_UP } from '../actions/usersActions'
const initialState = []

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      console.log('in reducer')
      break
    default:
      return state
  }
}
