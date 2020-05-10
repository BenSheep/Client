import React from 'react'
import Link from 'next/link'

const AppLayout = props => (
  <div className="lg:h-screen w-full mx-auto flex flex-wrap flex-row bg-silver">
    <div className="flex-col w-full lg:w-1/12">
      <nav
        data-test="navbar"
        className="h-full w-full bg-light-silver shadow-2xl text-blue"
      >
        <ul className="">
          <li className="py-2 text-4xl text-center font-semibold">
            <Link href="/app">
              <a
                data-test="courses-tab-button"
                className="p-4 block w-full hover:cursor-pointer"
              >
                S
              </a>
            </Link>
            <Link href="/app/courses">
              <a
                data-test="courses-tab-button"
                className="p-4 block w-full hover:cursor-pointer"
              >
                <img
                  className="mx-auto hover:bg-silver p-2 rounded-lg"
                  src="/icons/books.png"
                />
              </a>
            </Link>
          </li>
          <li className="py-2 text-white text-xl"></li>
          <li className="py-2 text-white text-xl"></li>
        </ul>
      </nav>
    </div>
    <div className="flex-col w-10/12 mx-auto lg:px-12">{props.children}</div>
  </div>
)

export default AppLayout
