/**
 * uppercase over lowercase because of character round trip
 * https://docs.microsoft.com/en-us/visualstudio/code-quality/ca1308-normalize-strings-to-uppercase?view=vs-2015&redirectedfrom=MSDN
 *
 */
export const compareStrings = (firstString, secondString) => {
  return firstString.toUpperCase() === secondString.toUpperCase()
}

export const capitalize = name => {
  return name.charAt(0).toUpperCase() + name.substring(1, name.length)
}

export const formatNumberTh = number => {
  if (number) {
    const lastDigit = number.toString().charAt(0)
    switch (lastDigit) {
      case '1':
        return `${number}st`
      case '2':
        return `${number}nd`
      case '3':
        return `${number}rd`
      default:
        return `${number}th`
    }
  }
}

export const getDays = () => {
  return ['Monday', 'Tuesday', 'Wednesday', 'Thurshday', 'Friday']
}

/**
 * Creates a generic array of days. If the schedule is known, update the days array for the days that the course is schedule and
 * its starting and ending time
 * @param {array} schedule The schedule for the course
 * @returns {array} The complete schedule array that will be used to output the collapsable card
 */
export const createDaysObjects = schedule => {
  const days = [
    { day: 'Monday', hasCourse: false },
    { day: 'Tuesday', hasCourse: false },
    { day: 'Wednesday', hasCourse: false },
    { day: 'Thursday', hasCourse: false },
    { day: 'Friday', hasCourse: false },
  ]

  // Do not change array if schedule for course is uknown
  if (schedule) {
    // minus one because we removed Sunday and the array is not anymore 0 based really
    schedule.map(sched => {
      days[sched.day - 1].hasCourse = true
      days[sched.day - 1].start = minutesTo24Hours(sched.start)
      days[sched.day - 1].end = minutesTo24Hours(sched.end)
    })
  }

  return days
}

/**
 * Course start - end times are stored as minutes from the start of the day. This way comparison is easier (int comparison) and different clients and handle it and output it in different ways. This functions formats minutes into a 24 hour format (eg. 09:00 or 14:45)
 *
 * @param {int} minutes Minutes from the start of the day
 * @returns {string} The formated minutes into 24 hour format
 */
export const minutesTo24Hours = minutes => {
  const hours =
    Math.floor(minutes / 60) < 10
      ? `0${Math.floor(minutes / 60)}`
      : Math.floor(minutes / 60)
  const mins = minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60
  return `${hours}:${mins}`
}

/**
 * Turns a 24H format into minutes from the start of the date. Reverse function of @see minutesTo24Hours
 * @param {string} timeString
 *
 * @returns {int} the number of minutes from the start of the day
 */
export const hoursToMinutes = timeString => {
  const hours = timeString.split(':')[0]

  if (isNaN(hours)) return

  return parseInt(hours) * 60
}
