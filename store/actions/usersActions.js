import api from '../api'

export const SIGN_UP = 'SIGN_UP'
export const LOG_IN = 'LOG_IN'
export const ERROR = 'ERROR'

export const signUp = (email, password) => dispatch => {
  const query = `mutation {
    register(email: "${email}", password: "${password}") {
      email
    }
  }`

  api.post('', { query }).then(res => {
    if (res.data.errors.length) {
      const error = res.data.errors[0]
      dispatch({ type: ERROR, error })
    }
  })
}
