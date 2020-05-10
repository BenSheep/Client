import Router from 'next/router'
import api from '../api'

export const STORE_COURSES = 'STORE_COURSES'
export const STORE_COURSE_DETAILS = 'STORE_COURSE_DETAILS'

export const ADD_COURSE = 'ADD_COURSE'

export const REMOVE_COURSE = 'REMOVE_COURSE'
export const REMOVE_COURSE_DETAILS = 'REMOVE_COURSE_DETAILS'

export const getCourses = token => dispatch => {
  if (token) {
    const query = `query{
        myCourses {
            name,
            schedule {
                day,
                start,
                end,
            },
            semester,
            grade
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
  redirectToLogin()
}

export const getCourseByName = (token, name) => dispatch => {
  if (token) {
    if (name) {
      const query = `query{
        course(name: "${name}"){
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
  redirectToLogin()
}

export const addCourse = (token, courseName) => dispatch => {
  if (token) {
    if (courseName) {
      const query = `mutation{
        addCourse(name: "${courseName}"){
          name
        }
      }`
      const options = createHeaders(token)
      return api.post('', { query }, options).then(res => {
        if (!res.data.errors) {
          const course = res.data.data.addCourse

          dispatch({
            type: ADD_COURSE,
            course,
          })
        }
      })
    }

    throw new Error('No course name provided')
  }
  throw new Error('No token provided')
}

export const updateCourseDetails = (token, newCourse) => dispatch => {
  if (token) {
    if (newCourse) {
      const query = `mutation{
        updateCourse(${createUpdateCourseParams(newCourse)}){
            name,
            professor,
            semester,
            grade,
            schedule{
              day,
              start,
              end
            }
          }
        }`

      return api.post('', { query }, createHeaders(token)).then(res => {
        if (!res.data.errors) {
          const course = res.data.data.updatedCourse

          dispatch({
            type: STORE_COURSE_DETAILS,
            course,
          })
        }
      })
    }

    return
  }

  throw new Error('No token provided')
}

export const deleteCourse = (token, course) => dispatch => {
  if (token) {
    if (course) {
      const query = `mutation{
        deleteCourse(name: "${course.name}"){

        }
      }`

      return api.post('', { query }, createHeaders(token)).then(res => {
        console.log(res.data)
        if (!res.data.errors) {
          dispatch({
            type: REMOVE_COURSE,
            course,
          })
        }
      })
    }

    throw new Error('No course provided')
  }

  throw new Error('No token provided')
}

export const deleteDetailedCourse = course => {
  if (course) {
    return {
      type: REMOVE_COURSE_DETAILS,
      course,
    }
  }
  throw new Error('No course provided')
}

const createHeaders = token => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

const redirectToLogin = () => {
  Router.replace('/login')
}

const createUpdateCourseParams = course => {
  const { name, schedule, semester, grade, professor } = course

  if (!name) throw new Error('Course must have a name')

  let params = `name: "${name}, "`

  if (schedule) {
    params += `schedule: ${schedule}, `
  }

  if (semester) {
    params += `semester: ${semester}, `
  }

  if (grade) {
    params += `grade: ${grade}, `
  }

  if (professor) {
    params += `professor: ${professor}, `
  }

  // remove last comma
  params = params.substring(0, params.length - 1)

  return params
}
