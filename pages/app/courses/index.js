import React from 'react'
import { connect } from 'react-redux'

import CourseCard from '~/components/CourseCard'
import AppLayout from '~/components/AppLayout'

import { getCourses } from '~/store/actions/coursesActions'

class CoursesPage extends React.Component {
  componentWillMount() {
    const { token } = this.props.user

    this.props.getCourses(token)
  }
  render() {
    const { courses } = this.props
    return (
      <AppLayout>
        <div className="flex-row">
          <h1
            className="w-full text-xl md:text-4xl text-blue"
            data-test="courses-header"
          >
            My courses
          </h1>
          <div
            className="mt-8 w-full flex flex-wrap flex-row"
            data-test="courses-list"
          >
            {courses.map(course => (
              <CourseCard key={course.name} course={course} />
            ))}
          </div>
        </div>
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
  getCourses,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage)
