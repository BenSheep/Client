import api from '../api'

export const STORE_COURSES = 'STORE_COURSES'
export const STORE_COURSE_DETAILS = 'STORE_COURSE_DETAILS'

export const getCourses = token => dispatch => {
  if (token) {
    const query = `query{
        myCourses {
          _id,
            name,
            schedule {
                day
            }
        }
    }`
    const options = createHeaders(token)
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
  throw new Error('No token provided')
}

export const getCourseByName = (token, name) => dispatch => {
  if (token) {
    if (name) {
      const query = `query{
        query(name: "${name}"){
          name,
          schedule{
              day,
              start,
              end
          },
          semester,
          grade,
          professor
        }
      }`

      const options = createHeaders(token)
      return api.post('', { query }, options).then(res => {
        if (!res.data.errors) {
          const course = res.data.data.course

          dispatch({
            type: STORE_COURSE_DETAILS,
            course,
          })
        }
      })
    }
    throw new Error('No name provided')
  }
  throw new Error('No token provided')
}

const createHeaders = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}
