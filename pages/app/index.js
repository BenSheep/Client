import React from 'react'
import AppLayout from '~/components/AppLayout'
import CoursesPage from '~/pages/app/courses'

export default class App extends React.Component {
  render() {
    return (
      <AppLayout>
        <CoursesPage />
      </AppLayout>
    )
  }
}
