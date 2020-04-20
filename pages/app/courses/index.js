import React from 'react'
import { connect } from 'react-redux'
import { getCourses } from '~/store/actions/coursesActions'

class CoursesPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thurshday',
        'Friday',
        'Saturday',
      ],
    }
  }
  componentWillMount() {
    const { token } = this.props.user

    this.props.getCourses(token)
  }
  render() {
    const { courses } = this.props
    return (
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
            <div key={course.name} className="flex-col w-full md:w-1/2">
              <div className="w-4/5 mx-auto bg-silver rounded-lg py-2 px-4">
                <h3 className="text-2xl text-red">{course.name}</h3>
                {course.schedule.length && (
                  <p className="text-xl text-red">
                    {this.state.days[course.schedule[0].day]}
                  </p>
                )}
              </div>
            </div>
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
