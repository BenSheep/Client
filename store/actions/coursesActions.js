import api from '../api'

export const STORE_COURSES = 'STORE_COURSES'

const query = `query{
    myCourses {
        name,
        schedule {
            day
        }
    }
}`

export const getCourses = token => dispatch => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return api.post('', { query }, options).then(res => {
    if (!res.data.errors) {
      const courses = res.data.data.myCourses

      dispatch({
        type: STORE_COURSES,
        courses,
      })
    }
  })
}
