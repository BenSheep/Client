import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import api from '../../store/api'

import Error from './Error'

import { storeToken } from '../../store/actions/userActions'

class LogInForm extends React.Component {
  state = { error: null }

  validate = values => {
    const errors = {}
    if (!values.emailOrUsername) {
      errors.emailOrUsername = 'Required'
    } else if (values.password.length < 8 || !/\d/.test(values.password)) {
      errors.password =
        'Password must have at least 8 characters and contain a number'
    }

    return errors
  }

  handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    const { emailOrUsername, password } = values

    if (emailOrUsername && password) {
      this.logIn(emailOrUsername, password, resetForm)
    }
  }

  handleOnFocus = () => {
    this.setState({ error: null })
  }

  logIn = (emailOrUsername, password, resetForm) => {
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
          resetForm()
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
    const { error } = this.state
    return (
      <div>
        <Formik
          initialValues={{ emailOrUsername: '', password: '' }}
          validate={this.validate}
          onSubmit={this.handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="md:pt-8">
              <h1 className="text-3xl md:text-6xl lg:text-6xl text-blue font-semibold">
                Log in
              </h1>
              <h3 className="text-lg md:text-xl text-gray">Welcome back</h3>
              <div className="w-full my-8">
                <Field
                  className="w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver pl-4 text-xl"
                  type="text"
                  name="emailOrUsername"
                  placeholder="Email or username"
                  data-test="email-username-input"
                  onFocus={this.handleOnFocus}
                />
                <ErrorMessage
                  name="emailOrUsername"
                  component="div"
                  className="w-4/5 mx-auto text-left text-red pl-1"
                  data-test="error-message"
                />
                {/* Shows up is there is an error response from the API and not from form vaildation from Formik */}
                {error && <Error error={error} />}
              </div>
              <div className="w-full mb-4">
                <Field
                  className="w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver pl-4 text-xl"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-test="password-input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="w-4/5 text-left text-red pl-16 pl-1"
                  data-test="error-message"
                />
              </div>
              <button
                className="mt-12 md:py-6 w-4/5 cta-lg text-xl uppercase"
                data-test="submit"
                type="submit"
                disabled={isSubmitting}
              >
                Log in
              </button>
            </Form>
          )}
        </Formik>
      </div>
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
)(LogInForm)
