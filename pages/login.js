import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import RegisterLayout from '../components/RegisterLayout'
import LogInForm from '../components/forms/LogInForm'

import api from '../store/api'
import { storeToken } from '../store/actions/userActions'

class LogIn extends React.Component {
  logIn = (emailOrUsername, password) => {
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
  }
  render() {
    return (
      <RegisterLayout>
        <LogInForm onLogIn={this.logIn} />
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
