import React from 'react'
import Link from 'next/link'

const AppLayout = props => (
  <div className="h-screen w-full mx-auto flex flex-wrap flex-col lg:flex-row relative">
    <div className="flex-col w-full lg:w-1/12 border px-4">
      <nav data-test="navbar">
        <ul>
          <li>
            <Link href="/app/courses">
              <a data-test="courses-tab-button">My courses</a>
            </Link>
          </li>
          <li>
            <a>Nani</a>
          </li>
          <li>
            <a>Nani</a>
          </li>
        </ul>
      </nav>
    </div>
    <div className="flex-col w-11/12 lg:px-12">{props.children}</div>
  </div>
)

export default AppLayout
