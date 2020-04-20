import React from 'react'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Error from './Error'

export default class LogInForm extends React.Component {
  state = { error: null }

  validate = values => {
    const errors = {}
    if (!values.emailOrUsername) {
      errors.emailOrUsername = 'Required'
    }

    if (values.password.length < 8 || !/\d/.test(values.password)) {
      errors.password =
        'Password must have at least 8 characters and contain a number'
    }

    return errors
  }

  handleOnSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)

    const { emailOrUsername, password } = values

    const { onLogIn } = this.props

    onLogIn(emailOrUsername, password, setSubmitting)
  }

  handleOnFocus = () => {
    const { onClearErrors } = this.props

    onClearErrors()
  }

  render() {
    const { error } = this.props
    console.log(error)
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
              <EmailField error={error} onFocusInput={this.handleOnFocus} />
              <PasswordField error={error} onFocusInput={this.handleOnFocus} />
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
        <SignUpMessage />
      </div>
    )
  }
}

const EmailField = ({ error, onFocusInput }) => (
  <div className="w-full my-8">
    <Field
      className="w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver focus:border-blue text-darkgray outline-none pl-4 text-xl"
      type="text"
      name="emailOrUsername"
      placeholder="Email or username"
      data-test="email-username-input"
      onFocus={onFocusInput}
    />
    <ErrorMessage
      name="emailOrUsername"
      component="div"
      className="w-4/5 mx-auto text-left text-red pl-1"
      data-test="error-message"
    />
    {/* Shows up is there is an error response from the API and not from form vaildation from Formik */}
    {error && error.status === 404 && <Error error={error} />}
  </div>
)

const PasswordField = ({ error, onFocusInput }) => (
  <div className="w-full mb-4">
    <Field
      className="w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver focus:border-blue text-darkgray outline-none pl-4 text-xl"
      type="password"
      name="password"
      placeholder="Password"
      data-test="password-input"
      onFocus={onFocusInput}
    />
    <ErrorMessage
      name="password"
      component="div"
      className="w-4/5 mx-auto text-left text-red pl-1"
      data-test="error-message"
    />
    {error && error.error === 'INCORRECT_PASSWORD' && <Error error={error} />}
  </div>
)

const SignUpMessage = () => (
  <h5 className="justify-center items-center mt-3 pb-8 text-gray text-md md:text-lg">
    Don't have an account?{' '}
    <Link href="/signup">
      <a className="text-blue" data-test="go-to-sign-up">
        Sign up
      </a>
    </Link>
  </h5>
)
