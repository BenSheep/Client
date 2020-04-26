import React, { useState } from 'react'
import Link from 'next/link'

import { capitalize, formatNumberTh } from '~/functions'

const CourseCard = ({ course }) => {
  const [days] = useState([
    { day: 'Monday', hasCourse: false },
    { day: 'Tuesday', hasCourse: false },
    { day: 'Wednesday', hasCourse: false },
    { day: 'Thursday', hasCourse: false },
    { day: 'Friday', hasCourse: false },
  ])

  const [isCollapsed, toggleCollapse] = useState(false)

  // make pretty link out of course's name
  const prettyCourseName = course.name
    .replace(/\s+/g, ' ')
    .trim()
    .replace(' ', '-')
    .toLowerCase()

  const collapseCard = e => {
    e.preventDefault()
    toggleCollapse(!isCollapsed)
  }

  return (
    <Link href="/app/courses/[name]" as={`/app/courses/${prettyCourseName}`}>
      <div data-test="course-card" className="flex-col w-full mb-8 md:mb-12">
        <div className="h-full w-full flex flex-wrap flex-row mx-auto hover:shadow-lg cursor-pointer silver-gradient tracking-wide rounded-lg">
          <div
            className={`w-full flex flex-wrap flex-row mx-auto px-4 md:px-8 py-8 ${
              isCollapsed ? 'shadow-lg' : ''
            }`}
          >
            <h3
              data-test="course-name"
              className="w-1/5 hidden md:inline text-xl"
            >
              {formatNumberTh(course.semester)} semester
            </h3>
            <p className="w-4/5 md:w-2/5 md:mx-auto text-xl text-gray">
              {capitalize(course.name)}
            </p>
            <p className="w-1/5 text-xl text-gray text-right">
              <span className="pr-8 hidden md:inline">
                {course.grade ? course.grade : '-'}
              </span>
              <span
                className="w-8 py-2 px-3 rounded-full orange-gradient"
                data-test="collapse-button"
                onClick={collapseCard}
              >
                <img
                  className="inline w-3 md:w-4 opacity-75 rounded-full"
                  src="/icons/expand.png"
                />
              </span>
            </p>
          </div>
          {isCollapsed ? (
            <div
              className="container w-full flex flex-wrap flex-row mx-auto py-4"
              data-test="schedule-container"
            >
              <CollapsedScheduleContent
                days={days}
                schedule={course.schedule}
              ></CollapsedScheduleContent>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

const CollapsedScheduleContent = props => {
  // minus one because we removed Sunday and the array is not anymore 0 based really
  props.schedule.map(sched => {
    props.days[sched.day - 1].hasCourse = true
    props.days[sched.day - 1].start = minutesTo24Hours(sched.start)
    props.days[sched.day - 1].end = minutesTo24Hours(sched.end)
  })

  return props.days.map(day => (
    <div
      key={day.day}
      className="mx-4 md:mx-0 py-2 md:py-2 flex-col w-full xl:w-1/5 md:text-center"
    >
      <p
        className={`inline md:block mx-2 md:mx-4 text-xl ${
          day.hasCourse ? 'text-orange' : 'text-gray'
        }`}
        data-test={day.hasCourse ? 'schedule-day' : ''}
      >
        {day.day}
      </p>
      {day.start && day.end ? (
        <p className="inline md:block mx-2 md:mx-4 text-lg text-orange">
          {day.start} - {day.end}
        </p>
      ) : null}
    </div>
  ))
}

/**
 * Course start - end times are stored as minutes from the start of the day. This way comparison is easier (int comparison) and different clients and handle it and output it in different ways. This functions formats minutes into a 24 hour format (eg. 09:00 or 14:45)
 *
 * @param {int} minutes Minutes from the start of the day
 * @returns {string} The formated minutes into 24 hour format
 */
const minutesTo24Hours = minutes => {
  const hours =
    Math.floor(minutes / 60) < 10
      ? `0${Math.floor(minutes / 60)}`
      : Math.floor(minutes / 60)
  const mins = minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60
  return `${hours}:${mins}`
}

export default CourseCard
