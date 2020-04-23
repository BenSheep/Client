import React, { Component } from 'react'
import { connect } from 'react-redux'

import AppLayout from '~/components/AppLayout'
import { getCourseByName } from '~/store/actions/coursesActions'
import { capitalize, formatNumberTh } from '~/functions'

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
                  {courseDetails.grade}
                </p>
              </div>
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
