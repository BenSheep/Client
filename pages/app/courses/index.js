import React from 'react'
import { connect } from 'react-redux'

import CourseCard from '~/components/CourseCard'
import AppLayout from '~/components/AppLayout'

import { getCourses } from '~/store/actions/coursesActions'

class CoursesPage extends React.Component {
  componentDidMount() {
    const { token } = this.props.user

    this.props.getCourses(token)
  }
  render() {
    const { courses } = this.props.courses

    return (
      <AppLayout>
        <div className="flex-col md:flex-row w-11/12 mx-auto my-8">
          <div className="flex flex-wrap">
            <h1
              className="flex flex-col w-full md:w-8/12 xl:w-9/12 text-2xl md:text-4xl text-blue tracking-wide"
              data-test="courses-header"
            >
              My Courses
            </h1>
            <button
              data-test="add-course-button"
              className="flex flex-col hidden relative md:inline w-4/12 xl:w-3/12 orange-gradient text-white justify-center items-center align-center rounded-full button"
              type="button"
            >
              <img className="bg-orange rounded-full" src="/icons/add.png" />
              <span className="text-xl">Add Course</span>
            </button>
          </div>
          <div
            className="mt-8 w-full flex flex-wrap flex-row"
            data-test="courses-list"
          >
            {courses &&
              courses.map(course => (
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
