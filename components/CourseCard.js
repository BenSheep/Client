import React, { useState } from 'react'
import Link from 'next/link'

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
      <div
        data-test="course-card"
        className="flex-col w-full h-min-10 md:w-1/2"
      >
        <div className="h-full w-4/5 mx-auto shadow-lg hover:shadow-xl cursor-pointer orange-gradient rounded-lg py-2 px-4">
          <h3 data-test="course-name" className="mt-4 text-2xl text-blue">
            {course.name}
          </h3>
          {course.schedule.length
            ? course.schedule.map((sched, index) => (
                <p key={index} className="text-xl text-blue">
                  {days[sched.day]}
                </p>
              ))
            : null}
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
