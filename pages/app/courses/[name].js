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

  componentDidMount() {
    const { courseDetails } = this.props.courses

    // check if course is already in the redux store

    if (courseDetails) {
      if (courseDetails.name === this.formatName(this.props.query.name)) {
        return
      }
      this.props.deleteDetailedCourse(courseDetails)
    }

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
            className="flex flex-wrap flex-col md:flex-row w-4/5 mx-auto text-blue bg-silver rounded-lg p-4 mt-8"
          >
            <h1
              className="w-full flex text-xl md:text-4xl mb-8"
              data-test="course-name"
            >
              {capitalize(courseDetails.name)} -{' '}
              {formatNumberTh(courseDetails.semester)} semester
            </h1>
            {courseDetails.grade ? (
              <CourseGradeComponent
                grade={courseDetails.grade}
              ></CourseGradeComponent>
            ) : null}
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </AppLayout>
    )
  }
}

const CourseGradeComponent = props => (
  <div className="flex flex-wrap flex-col w-full mx-auto">
    <h3
      data-test="course-grade-header"
      className="flex mx-auto text-xl md:text-4xl text-blue font-semibold"
    >
      Grade
    </h3>
    <p
      data-test="course-grade"
      className="flex mx-auto text-xl md:text-4xl text-blue font-semibold"
    >
      {props.grade}
    </p>
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
