import React, { Component, useState } from 'react'
import { connect } from 'react-redux'

import AppLayout from '~/components/AppLayout'
import {
  getCourseByName,
  deleteDetailedCourse,
} from '~/store/actions/coursesActions'
import {
  capitalize,
  formatNumberTh,
  getDays,
  minutesTo24Hours,
} from '~/functions'

class CourseDetailsPage extends Component {
  state = { edit: false }
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

  onSaveHandler = () => {
    this.setState({ edit: false })

    // updateCourse
  }

  render() {
    const { courseDetails } = this.props.courses
    const { edit } = this.state

    return (
      <AppLayout>
        {courseDetails ? (
          <div
            data-test="course-detail-card"
            className="flex flex-wrap flex-col md:flex-row w-4/5 text-blue mt-8 ml-8"
          >
            {!edit ? (
              <img
                className="cursor-pointer"
                src="/icons/edit.png"
                data-test="edit-course-button"
                onClick={() => this.setState({ edit: !edit })}
              />
            ) : (
              <img
                className="cursor-pointer"
                src="/icons/check.png"
                data-test="save-button"
                onClick={() => this.onSaveHandler()}
              />
            )}
            <h1
              className="w-full flex text-xl md:text-4xl mb-2"
              data-test="course-name"
            >
              {capitalize(courseDetails.name)} -{' '}
              {formatNumberTh(courseDetails.semester)} semester
            </h1>
            <AdditionalCourseInfo
              course={courseDetails}
              edit={edit}
            ></AdditionalCourseInfo>
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
      {props.course.professor && !props.edit ? (
        <span data-test="course-professor" className="ml-2">
          {props.course.professor}
        </span>
      ) : (
        <input
          data-test="professor-name-input"
          className="ml-2 px-2 border-2"
          type="text"
          placeholder={props.course.professor}
        />
      )}
    </h3>
    <h5
      data-test="course-grade-header"
      className="flex text-lg md:text-xl text-blue font-semibold"
    >
      Grade:{' '}
      {props.course.grade && !props.edit ? (
        <span data-test="course-grade" className="ml-2">
          {props.course.grade}
        </span>
      ) : (
        <input
          data-test="grade-input"
          className="ml-2 px-2 border-2"
          type="number"
          placeholder={props.course.grade}
        />
      )}
    </h5>
    {props.course.schedule.map(sched => (
      <ScheduleRow schedule={sched} edit={props.edit} key={sched.day} />
    ))}
  </div>
)

const ScheduleRow = props => {
  const [days] = useState(getDays())
  const [startTime, setStartTime] = useState(
    minutesTo24Hours(props.schedule.start)
  )

  return (
    <div className="mt-2">
      <h5 className="inline mr-4 text-xl text-blue">
        {days[props.schedule.day]} -
      </h5>
      {props.edit ? (
        <input
          data-test="schedule-time-input"
          type="time"
          min="09:00"
          max="21:00"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
      ) : (
        <p className="inline text-xl text-orange">{startTime}</p>
      )}
    </div>
  )
}

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
