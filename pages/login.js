import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import RegisterLayout from '../components/RegisterLayout'
import LogInForm from '../components/forms/LogInForm'

import api from '../store/api'
import { storeToken } from '../store/actions/userActions'

class LogIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = { error: null }

    this.logIn = this.logIn.bind(this)
  }

  logIn = (emailOrUsername, password, setSubmitting) => {
    let query
    if (emailOrUsername.indexOf('@') !== -1) {
      query = `mutation {
            login(email: "${emailOrUsername}", password: "${password}") {
              token
            }
          }`
    } else {
      query = `mutation {
            login(username: "${emailOrUsername}", password: "${password}") {
              token
            }
          }`
    }
    api
      .post('', { query })
      .then(res => {
        if (res.data.errors) {
          this.setState({ error: res.data.errors[0] })
          return
        }
        const { token } = res.data.data.login
        this.props.storeToken(token)
        Router.push('/app')
      })
      .catch(() => {
        this.setState({ error: { message: 'something went terribly wrong' } })
      })
      .then(setSubmitting(false))
  }

  clearErrors = () => {
    this.setState({ error: null })
  }
  render() {
    return (
      <RegisterLayout>
        <LogInForm
          onLogIn={this.logIn}
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
)(LogIn)
