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
    <div className="flex-col w-full h-min-10 md:w-1/2">
      <div className="h-full w-4/5 mx-auto shadow-lg hover:shadow-xl cursor-pointer orange-gradient rounded-lg py-2 px-4">
        <h3 className="mt-4 text-2xl text-blue">{course.name}</h3>
        {course.schedule.length
          ? course.schedule.map((sched, index) => (
              <p key={index} className="text-xl text-blue">
                {days[sched.day]}
              </p>
            ))
          : null}
      </div>
    </div>
  )
}

export default CourseCard
