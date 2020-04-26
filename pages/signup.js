import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'

import RegisterLayout from '~/components/RegisterLayout'
import SignUpForm from '~/components/forms/SignUpForm'

import api from '~/store/api'
import { storeToken } from '~/store/actions/userActions'

class SignUp extends React.Component {
  signUp(email, password) {
    const query = `mutation {
        register(email: "${email}", password: "${password}") {
          email
        }
      }`
    return api.post('', { query })
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

  render() {
    return (
      <RegisterLayout>
        <SignUpForm onSignUp={this.signUp} />
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
