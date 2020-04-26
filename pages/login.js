import React from 'react'
import { connect } from 'react-redux'

import RegisterLayout from '~/components/RegisterLayout'
import LogInForm from '~/components/forms/LogInForm'

import api from '~/store/api'
import { storeToken } from '~/store/actions/userActions'

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
    return api.post('', { query })
  }

  render() {
    return (
      <RegisterLayout>
        <LogInForm
          onLogIn={this.logIn}
          onSuccess={token => this.props.storeToken(token)}
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
