import React from 'react'

export default class CoursesPage extends React.Component {
  render() {
    return (
      <div>
        <h1 data-test="courses-header">My courses</h1>
        <div data-test="courses-list"></div>
      </div>
    )
  }
}
