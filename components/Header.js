import React from 'react'
import Link from 'next/link'

const Header = () => (
  <nav className="hidden lg:flex items-center justify-between flex-wrap shadow-lg p-6 pl-12 pr-12">
    <div className="flex items-center flex-shrink-0 mr-6">
      <Link href="/">
        <a>
          <span className="font-semibold text-3xl text-blue tracking-tight">
            Study
          </span>
        </a>
      </Link>
    </div>
    <div className="links w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div className="text-lg lg:flex-grow lg:text-right">
        <Link href="/about">
          <a className="block mt-4 lg:inline-block lg:mt-0 mr-12 text-blue">
            About
          </a>
        </Link>
        <a
          href=""
          className="block mt-4 lg:inline-block lg:mt-0 mr-12 text-blue"
        >
          Pricing
        </a>
        <a
          href=""
          className="block mt-4 lg:inline-block lg:mt-0 mr-12 text-blue"
        >
          Blog
        </a>
      </div>
      <div>
        <a href="#" className="text-lg lg:mt-0 cta uppercase">
          Sign up
        </a>
      </div>
    </div>
  </nav>
)

export default Header
