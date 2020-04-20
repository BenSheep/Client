import React from 'react'
import { connect } from 'react-redux'
import { getCourses } from '~/store/actions/coursesActions'

class CoursesPage extends React.Component {
  componentWillMount() {
    const { token } = this.props.user

    this.props.getCourses(token)
  }
  render() {
    const { courses } = this.props
    return (
      <div>
        <h1 data-test="courses-header">My courses</h1>
        <div data-test="courses-list">
          {courses.map(course => (
            <h1 key={course.name}>{course.name}</h1>
          ))}
        </div>
      </div>
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
  getCourses,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage)
