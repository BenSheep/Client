import React, { Component, useState } from 'react'
import { connect } from 'react-redux'

import AppLayout from '~/components/AppLayout'
import {
  getCourseByName,
  deleteDetailedCourse,
  updateCourseDetails,
} from '~/store/actions/coursesActions'

import {
  compareStrings,
  capitalize,
  formatNumberTh,
  getDays,
  minutesTo24Hours,
  hoursToMinutes,
} from '~/functions'

class CourseDetailsPage extends Component {
  state = { edit: false, delete: false }
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
      if (
        compareStrings(
          courseDetails.name,
          this.formatName(this.props.query.name)
        )
      ) {
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

    const { token } = this.props.user

    this.props.updateCourseDetails(token, this.state.course)
  }

  onChangeHandler = newVal => {
    const { courseDetails, key, val } = this.prepareUpdateValues(newVal)

    this.setState(state => ({
      course: {
        ...state.course,
        ...courseDetails,
        [key]: val,
      },
    }))
  }

  onScheduleChangeHandler = (newVal, day) => {
    const { courseDetails, key, val } = this.prepareUpdateValues(newVal)

    const index = this.state.course.schedule.findIndex(
      sched => sched.day === day
    )

    const newSchedule = [...this.state.course.schedule]
    newSchedule[index] = {
      ...newSchedule[index],
      [key]: val,
    }

    this.setState(state => ({
      course: {
        ...state.course,
        ...courseDetails,
        schedule: newSchedule,
      },
    }))
  }

  prepareUpdateValues = newVal => {
    const { courseDetails } = this.props.courses

    const key = Object.keys(newVal)[0]
    const val = Object.values(newVal)[0]

    return { courseDetails, key, val }
  }

  onAlertClickHandler = answer => {
    this.setState({ delete: !this.state.delete })
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
            {this.state.delete ? (
              <VerifyDeleteAlert
                course={courseDetails.name}
                onclick={this.onAlertClickHandler}
              ></VerifyDeleteAlert>
            ) : null}
            {!edit ? (
              <div>
                <img
                  className="inline mr-4 cursor-pointer"
                  src="/icons/edit.png"
                  data-test="edit-course-button"
                  onClick={() => this.setState({ edit: !edit })}
                />
                <img
                  className="inline cursor-pointer text-red"
                  src="/icons/delete.png"
                  data-test="delete-course-button"
                  onClick={() => this.setState({ delete: !this.state.delete })}
                />
              </div>
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
              onchange={this.onChangeHandler}
              onScheduleChange={this.onScheduleChangeHandler}
            ></AdditionalCourseInfo>
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </AppLayout>
    )
  }
}

const AdditionalCourseInfo = props => {
  const onChangeHandler = (e, prop) => {
    const newValue = e.target.value

    // strong type string or integer
    props.onchange({ [prop]: isNaN(newValue) ? newValue : parseInt(newValue) })
  }

  const onScheduleChangeHandler = (key, val, day) => {
    if (val === '') return

    props.onScheduleChange(
      {
        [key]: hoursToMinutes(val),
      },
      day
    )
  }

  return (
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
            onChange={e => onChangeHandler(e, 'professor')}
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
            onChange={e => onChangeHandler(e, 'grade')}
          />
        )}
      </h5>
      {props.course.schedule.map(sched => (
        <ScheduleRow
          schedule={sched}
          edit={props.edit}
          key={sched.day}
          onScheduleChange={onScheduleChangeHandler}
        />
      ))}
    </div>
  )
}

const ScheduleRow = props => {
  const [days] = useState(getDays())
  const [startTime, setStartTime] = useState(
    minutesTo24Hours(props.schedule.start)
  )

  const [endTime, setEndTime] = useState(minutesTo24Hours(props.schedule.end))

  return (
    <div className="mt-2">
      {props.edit ? (
        <div className="inline">
          <select
            data-test="schedule-day-dropdown"
            className="mr-4 text-xl text-blue"
            defaultValue={days[props.schedule.day]}
          >
            {days.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <input
            className="mr-2"
            data-test="schedule-start-time-input"
            type="time"
            min="09:00"
            max="21:00"
            value={startTime}
            onChange={e => {
              setStartTime(e.target.value)
              props.onScheduleChange(
                'start',
                e.target.value,
                props.schedule.day
              )
            }}
          />
          <input
            data-test="schedule-end-time-input"
            type="time"
            min={startTime}
            max="21:00"
            value={endTime}
            onChange={e => {
              setEndTime(e.target.value)
              props.onScheduleChange('end', e.target.value, props.schedule.day)
            }}
          />
        </div>
      ) : (
        <div className="inline">
          <h5
            data-test="schedule-day"
            className="inline mr-4 text-xl text-blue"
          >
            {days[props.schedule.day]} -
          </h5>
          <p
            className="inline mr-4 text-xl text-orange"
            data-test="schedule-start-time"
          >
            {startTime}
          </p>
          <p
            className="inline text-xl text-orange"
            data-test="schedule-end-time"
          >
            {endTime}
          </p>
        </div>
      )}
    </div>
  )
}

const VerifyDeleteAlert = props => {
  const onClickButtonHandler = answer => {
    props.onclick(answer)
  }
  return (
    <div
      data-test="verify-alert-box"
      className="modal flex justify-center items-center"
    >
      <div className="w-11/12 md:w-3/5 xl:w-2/5 bg-white pt-12 text-center">
        <h3 className="text-xl text-blue">
          Are you sure you want to delete <b>{props.course}</b> ?
        </h3>
        <p className="text-md text-gray">This action cannot be undone</p>
        <div className="mt-8 pb-12 flex flex-row text-white">
          <div className="flex-col w-1/2">
            <button
              data-test="no-button"
              className=" mx-auto w-1/2 bg-red p-4"
              onClick={() => onClickButtonHandler(true)}
            >
              No
            </button>
          </div>
          <div className="flex-col w-1/2">
            <button
              data-test="yes-button"
              className=" mx-auto w-1/2 bg-green p-4"
              onClick={() => onClickButtonHandler(false)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
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
  updateCourseDetails,
  deleteDetailedCourse,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseDetailsPage)
