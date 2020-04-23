import React from 'react'
import AppLayout from '~/components/AppLayout'
import CoursesPage from '~/pages/app/courses'
import { useRouter } from 'next/router'

const App = () => (
  <AppLayout>
    {useRouter().pathname === '/app' ? <p>Index page mage</p> : null}
    {useRouter().pathname === '/app/courses' ? <CoursesPage /> : null}
  </AppLayout>
)

export default App
