import React, { useState } from 'react'
import Link from 'next/link'

import { capitalize, formatNumberTh } from '~/functions'

const CourseCard = ({ course }) => {
  const [days] = useState([
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thurshday',
    'Friday',
    'Saturday',
  ])

  // make pretty link out of course's name
  const prettyCourseName = course.name
    .replace(/\s+/g, ' ')
    .trim()
    .replace(' ', '-')
    .toLowerCase()

  return (
    <Link href="/app/courses/[name]" as={`/app/courses/${prettyCourseName}`}>
      <div data-test="course-card" className="flex-col w-full mb-8 md:mb-12">
        <div className="h-full w-full flex flex-wrap flex-row mx-auto hover:shadow-lg cursor-pointer silver-gradient tracking-wide rounded-lg px-4 py-8 md:px-8">
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
            <span className="w-8 py-2 px-3 rounded-full orange-gradient">
              <img
                className="inline w-3 md:w-4 opacity-75 rounded-full"
                src="/icons/expand.png"
              />
            </span>
          </p>
          {course.schedule.length
            ? course.schedule.map((sched, index) => (
                <p key={index} className="w-3/5 text-xl text-blue mx-auto">
                  {/* {days[sched.day]} */}
                </p>
              ))
            : null}
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
