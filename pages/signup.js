import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import RegisterLayout from '../components/RegisterLayout'
import SignUpForm from '../components/forms/SignUpForm'

import api from '../store/api'
import { storeToken } from '../store/actions/userActions'

class SignUp extends React.Component {
  signUp(email, password) {
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

  signUpHandler = (email, password) => {
    if (email && password) {
      this.signUp(email, password)
    }
  }
  render() {
    return (
      <RegisterLayout>
        <SignUpForm onSignUp={this.signUpHandler} />
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
