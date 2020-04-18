import api from '../api'

export const SIGN_UP = 'SIGN_UP'

export const loadUsers = () => dispatch => {
  return api.get('/users').then(res => {
    const users = res.data

    dispatch({
      type: STORE_USERS,
      users,
    })
  })
}

export const signUp = (email, password) => dispatch => {
  const query = `mutation {
    register(email: "${email}", password: "${password}") {
      email
    }
  }`

  api.post('', { query }).then(res => {
    console.log(res.data)
  })
}
