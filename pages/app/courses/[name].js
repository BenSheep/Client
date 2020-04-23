import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppLayout from '~/components/AppLayout'
import { getCourseByName } from '~/store/actions/coursesActions'
import { capitalize } from '~/functions'

class CourseDetailsPage extends Component {
  static getInitialProps({ query }) {
    return { query }
  }
  componentDidMount() {
    const { token } = this.props.user
    const courseName = this.formatName(this.props.query.name)
    this.props.getCourseByName(token, courseName)
  }

  formatName = name => {
    return name.replace('-', ' ')
  }

  render() {
    const { courseDetails } = this.props.courses
    return (
      <AppLayout>
        {courseDetails ? (
          <div data-test="course-detail-card" className="text-blue">
            <h1 className="text-xl md:text-4xl" data-test="course-name">
              {capitalize(courseDetails.name)}
            </h1>
            <p>Semester: {courseDetails.semester}</p>
            {courseDetails.grade ? (
              <h3 data-test="course-grade">
                Your grade is {courseDetails.grade}
              </h3>
            ) : null}
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </AppLayout>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    courses: state.courses,
  }
}

const mapDispatchToProps = {
  getCourseByName,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetailsPage)
