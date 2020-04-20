import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import RegisterLayout from '../components/RegisterLayout'
import SignUpForm from '../components/forms/SignUpForm'

import api from '../store/api'
import { storeToken } from '../store/actions/userActions'

class SignUp extends React.Component {
  constructor(props) {
    super(props)

    this.state = { error: null }
    this.signUp = this.signUp.bind(this)
  }

  signUp(email, password, setSubmitting) {
    const query = `mutation {
        register(email: "${email}", password: "${password}") {
          email
        }
      }`
    api
      .post('', { query })
      .then(res => {
        if (res.data.errors) {
          this.setState({ error: res.data.errors[0], isEmailError: true })
          return
        }
        this.setState({ error: null })
        this.logIn(email, password)
      })
      .catch(error => {
        this.setState({ error })
      })
      .then(setSubmitting(false))
  }

  logIn = (email, password) => {
    const query = `mutation {
      login(email: "${email}", password: "${password}") {
        token
      }
    }`
    api.post('', { query }).then(res => {
      const { token } = res.data.data.login
      this.props.storeToken(token)
      Router.push('/app')
    })
  }

  clearErrors = () => {
    this.setState({ error: null })
  }

  render() {
    return (
      <RegisterLayout>
        <SignUpForm
          onSignUp={this.signUp}
          error={this.state.error}
          onClearErrors={this.clearErrors}
        />
      </RegisterLayout>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  storeToken,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
