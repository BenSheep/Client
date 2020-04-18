import { ERROR } from '../actions/usersActions'
const initialState = { data: null }

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR: {
      const { error } = action
      state = {
        ...state,
        error,
      }
      return state
    }
    default:
      return state
  }
}
