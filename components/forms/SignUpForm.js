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
    } else if (values.password.length < 8 || !/\d/.test(values.password)) {
      errors.password =
        'Password must have at least 8 characters and contain a number'
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
      <div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={this.validate}
          onSubmit={this.handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="pt-8">
              <h1 className="text-6xl text-blue font-semibold">Sign up</h1>
              <h3 className="text-xl text-gray">It's completely free</h3>
              <div className="w-full my-8">
                <Field
                  className="w-4/5 rounded-lg py-6 border-2 border-solid border-silver pl-4 text-xl"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  data-test="email-input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-left text-red pl-16"
                />
              </div>
              <div className="w-full mb-4">
                <Field
                  className="w-4/5 rounded-lg py-6 border-2 border-solid border-silver pl-4 text-xl"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-test="password-input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-left text-red pl-16"
                />
              </div>
              <button
                className="mt-12 w-4/5 cta-lg text-xl uppercase"
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
