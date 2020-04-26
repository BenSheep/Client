import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppLayout from '~/components/AppLayout'
import {
  getCourseByName,
  deleteDetailedCourse,
} from '~/store/actions/coursesActions'
import { capitalize, formatNumberTh } from '~/functions'

class CourseDetailsPage extends Component {
  // get the url query
  static getInitialProps({ query }) {
    return { query }
  }

  // Mocking cache
  componentDidMount() {
    const { courseDetails } = this.props.courses

    // check if course is already in the redux store
    if (courseDetails) {
      // if course is already in redux return early (no http request)
      if (courseDetails.name === this.formatName(this.props.query.name)) {
        return
      }
      // if not delete this course from redux so the new one can be fetched
      this.props.deleteDetailedCourse(courseDetails)
    }

    // fetch course from the API
    const { token } = this.props.user
    const courseName = this.formatName(this.props.query.name)
    this.props.getCourseByName(token, courseName)
  }

  // from pretty link to actual name
  formatName = name => {
    return name.replace('-', ' ')
  }

  render() {
    const { courseDetails } = this.props.courses
    return (
      <AppLayout>
        {courseDetails ? (
          <div
            data-test="course-detail-card"
            className="flex flex-wrap flex-col md:flex-row w-4/5 text-blue mt-8 ml-8"
          >
            <h1
              className="w-full flex text-xl md:text-4xl mb-2"
              data-test="course-name"
            >
              {capitalize(courseDetails.name)} -{' '}
              {formatNumberTh(courseDetails.semester)} semester
            </h1>
            <AdditionalCourseInfo course={courseDetails}></AdditionalCourseInfo>
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </AppLayout>
    )
  }
}

const AdditionalCourseInfo = props => (
  <div>
    <h3
      className="w-full text-md md:text-lg mb-2"
      data-test="course-professor-header"
    >
      Professor:{' '}
      {props.course.professor ? (
        <span data-test="course-professor" className="ml-2">
          {props.course.professor}
        </span>
      ) : null}
    </h3>
    <h5
      data-test="course-grade-header"
      className="flex text-lg md:text-xl text-blue font-semibold"
    >
      Grade:{' '}
      {props.course.grade ? (
        <span data-test="course-grade" className="ml-2">
          {props.course.grade}
        </span>
      ) : null}
    </h5>
  </div>
)

function mapStateToProps(state) {
  return {
    user: state.user,
    courses: state.courses,
  }
}

const mapDispatchToProps = {
  getCourseByName,
  deleteDetailedCourse,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetailsPage)
