import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import api from '../../store/api'

import Error from './Error'

import { storeToken } from '../../store/actions/userActions'

class SignUpForm extends React.Component {
  state = { error: null }

  validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

  handleOnSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)

    const { email, password } = values
    if (email && password) {
      this.signUp(email, password, setSubmitting, resetForm)
    }
  }

  signUp(email, password, setSubmitting, resetForm) {
    const query = `mutation {
      register(email: "${email}", password: "${password}") {
        email
      }
    }`
    api
      .post('', { query })
      .then(res => {
        if (res.data.errors) {
          this.setState({ error: res.data.errors[0] })
          resetForm()
          return
        }

        this.setState({ error: null })
        this.logIn(email, password)
      })
      .catch(error => {
        this.setState({ error })
        resetForm()
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

  render() {
    const { error } = this.state
    return (
      <div className="p-12">
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={this.validate}
          onSubmit={this.handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className="border-2 border-solid border-blue mr-6 py-2"
                type="email"
                name="email"
                data-test="email-input"
              />
              <ErrorMessage name="email" component="div" />
              <Field
                className="border-2 border-solid border-blue mr-6 py-2"
                type="password"
                name="password"
                data-test="password-input"
              />
              <ErrorMessage name="password" component="div" />
              <button
                className="cta"
                data-test="submit"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {error && <Error error={error} />}
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
)(SignUpForm)
