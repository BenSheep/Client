import React from 'react'
import Link from 'next/link'
import LogInForm from '../components/forms/LogInForm'

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="w-full h-screen flex flex-col mx-auto text-center bg-cream">
        <h1 className="text-blue text-4xl mt-2 mb-12">Study</h1>
        <div className="mx-auto w-4/5 md:w-2/5  justify-center items-center mt-12 shadow-2xl bg-white">
          <LogInForm className="" />
          <h5 className="justify-center items-center mt-3 pb-8 text-gray text-lg">
            Don't have an account?{' '}
            <Link href="/login">
              <a className="text-blue" data-test="go-to-sign-up">
                Sign up
              </a>
            </Link>
          </h5>
        </div>
      </div>
    )
  }
}
