import React, { Component } from 'react'
import Link from 'next/link'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { showBurgerMenuLinks: false }
  }

  handleBurgerMenuClick() {
    this.setState(state => ({
      showBurgerMenuLinks: !state.showBurgerMenuLinks,
    }))
  }
  render() {
    const { showBurgerMenuLinks } = this.state
    return (
      <nav className="flex items-center justify-between flex-wrap shadow-lg p-6 lg:pl-12 lg:pr-12">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/">
            <a>
              <span className="font-semibold text-3xl text-blue tracking-tight">
                Study
              </span>
            </a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-blue border-blue hover:text-blue hover:border-blue"
            onClick={() => {
              this.handleBurgerMenuClick()
            }}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`links w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            showBurgerMenuLinks ? 'hidden' : ''
          }`}
        >
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
  }
}
