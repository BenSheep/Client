import React from 'react'
import RegisterLayout from '../components/RegisterLayout'
import SignUpForm from '../components/forms/SignUpForm'

export default class SignUp extends React.Component {
  render() {
    return (
      <RegisterLayout>
        <SignUpForm className="" />
      </RegisterLayout>
    )
  }
}
