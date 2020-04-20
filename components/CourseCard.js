import React, { useState } from 'react'

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

  return (
    <div className="flex-col w-full md:w-1/2">
      <div className="w-4/5 mx-auto shadow-lg bg-silver rounded-lg py-2 px-4">
        <h3 className="text-2xl text-red">{course.name}</h3>
        {course.schedule.length
          ? course.schedule.map((sched, index) => (
              <p key={index} className="text-xl text-red">
                {days[sched.day]}
              </p>
            ))
          : null}
      </div>
    </div>
  )
}

export default CourseCard
