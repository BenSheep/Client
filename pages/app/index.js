import React from 'react'
import Link from 'next/link'

export default class App extends React.Component {
  render() {
    return (
      <div className="w-full mx-auto flex flex-col relative">
        <div className="w-full lg:w-1/12 border">
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
      </div>
    )
  }
}
