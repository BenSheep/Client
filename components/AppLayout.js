import React from 'react'
import Link from 'next/link'

const AppLayout = props => (
  <div className="h-screen w-full mx-auto flex flex-wrap flex-col lg:flex-row relative ">
    <div className="flex-col w-full lg:w-2/12">
      <nav
        data-test="navbar"
        className="h-full w-full bg-blue rounded-xl shadow-2xl"
      >
        <ul className="">
          <li className="py-2 text-white text-xl">
            <Link href="/app/courses">
              <a
                data-test="courses-tab-button"
                className="p-4 block w-full hover:rounded-md hover:bg-light-blue hover:cursor-pointer"
              >
                My courses
              </a>
            </Link>
          </li>
          <li className="py-2 text-white text-xl">
            <a className="p-4 block w-full hover:rounded-md hover:bg-light-blue hover:cursor-pointer">
              Nani
            </a>
          </li>
          <li className="py-2 text-white text-xl">
            <a className="p-4 block w-full hover:rounded-md hover:bg-light-blue hover:cursor-pointer">
              Nani
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div className="flex-col w-10/12 mx-auto lg:px-12">{props.children}</div>
  </div>
)

export default AppLayout
