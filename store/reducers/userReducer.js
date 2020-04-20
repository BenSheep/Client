import { STORE_TOKEN } from '~/store/actions/userActions'
const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_TOKEN: {
      const { token } = action
      if (token) {
        return { ...state, token }
      }
      return state
    }
    default:
      return state
  }
}
