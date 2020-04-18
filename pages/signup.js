import React from 'react'
import SignUpForm from '../components/forms/SignUpForm'

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="w-full h-screen flex flex-col mx-auto text-center bg-cream">
        <h1 className="text-blue text-4xl mt-2 mb-12">Study</h1>
        <div className="mx-auto w-4/5 md:w-2/5  justify-center items-center mt-12 shadow-2xl bg-white">
          <SignUpForm className="" />
          <h5 className="justify-center items-center mt-3 pb-8 text-gray text-lg">
            Already have an account?{' '}
            <a href="/login" className="text-blue">
              Log in
            </a>
          </h5>
        </div>
      </div>
    )
  }
}
