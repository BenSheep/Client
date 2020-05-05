import React, { useState } from 'react'
import Link from 'next/link'

import { capitalize, formatNumberTh, createDaysObjects } from '~/functions'

const CourseCard = ({ course }) => {
  const [days] = useState(createDaysObjects(course.schedule))

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
              {course.semester && `${formatNumberTh(course.semester)} semester`}
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
                  src={
                    isCollapsed ? '/icons/collapse.png' : '/icons/expand.png'
                  }
                />
              </span>
            </p>
          </div>
          {isCollapsed ? (
            <CollapsedScheduleContent
              days={days}
              schedule={course.schedule}
            ></CollapsedScheduleContent>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

const CollapsedScheduleContent = props => {
  return (
    <div
      className="container w-full flex flex-wrap flex-row mx-auto py-4"
      data-test="schedule-container"
    >
      {props.days.map(day => (
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
      ))}
    </div>
  )
}

export default CourseCard
