import React from 'react'
import RegisterLayout from '../components/RegisterLayout'
import LogInForm from '../components/forms/LogInForm'

export default class SignUp extends React.Component {
  render() {
    return (
      <RegisterLayout>
        <LogInForm className="" />
      </RegisterLayout>
    )
  }
}
