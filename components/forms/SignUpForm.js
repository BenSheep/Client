import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Error from './Error'

export default class SignUpForm extends React.Component {
  state = { error: null }

  validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (values.password.length < 8 || !/\d/.test(values.password)) {
      errors.password =
        'Password must have at least 8 characters and contain a number'
    }

    return errors
  }

  handleOnSubmit = (values, { setSubmitting }) => {
    const { email, password } = values
    const { onSignUp, onLogIn, onSuccess } = this.props

    onSignUp(email, password)
      .then(res => {
        if (res.data.errors) {
          this.setState({ error: res.data.errors[0] })
          return
        }
        onLogIn(email, password).then(res => {
          const { token } = res.data.data.login
          onSuccess(token)
          Router.push('/app')
        })
      })
      .catch(error => {
        this.setState({ error })
      })
      .then(() => {
        setSubmitting(false)
      })
  }

  handleOnFocus = () => {
    this.setState({ error: null })
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
            <Form className="md:pt-8">
              <h1 className="text-3xl md:text-6xl lg:text-6xl text-blue font-semibold">
                Sign up
              </h1>
              <h3 className="text-lg md:text-xl text-gray">
                It's completely free
              </h3>
              <EmailField error={error} onFocusInput={this.handleOnFocus} />
              <PasswordField />
              {!error && (
                <p className="w-4/5 mx-auto text-sm text-left text-gray pl-1">
                  Password must have at least 8 characters and contain a number
                </p>
              )}
              <button
                className="mt-12 md:py-6 w-4/5 cta-lg text-xl uppercase"
                data-test="submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing you up...' : 'Sign up'}
              </button>
            </Form>
          )}
        </Formik>
        <LogInMessage />
      </div>
    )
  }
}

const EmailField = ({ error, onFocusInput }) => (
  <div className="w-full my-8">
    <Field
      className="w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver focus:border-blue outline-none text-darkgray pl-4 text-xl"
      type="email"
      name="email"
      placeholder="Email address"
      data-test="email-input"
      onFocus={onFocusInput}
    />
    <ErrorMessage
      name="email"
      component="div"
      className="w-4/5 mx-auto text-left text-red pl-1"
      data-test="error-message"
    />
    {/* Shows up is there is an error response from the API and not from form vaildation from Formik */}
    {error && <Error error={error} />}
  </div>
)

const PasswordField = () => (
  <div className="w-full mb-4">
    <Field
      className="w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver focus:border-blue outline-none text-darkgray pl-4 text-xl"
      type="password"
      name="password"
      placeholder="Password"
      data-test="password-input"
    />
    <ErrorMessage
      name="password"
      component="div"
      className="w-4/5 mx-auto text-left text-red pl-1"
      data-test="error-message"
    />
  </div>
)

const LogInMessage = () => (
  <h5 className="justify-center items-center mt-3 pb-8 text-gray text-md md:text-lg">
    Already have an account?{' '}
    <Link href="/login">
      <a className="text-blue" data-test="go-to-log-in">
        Log in
      </a>
    </Link>
  </h5>
)
