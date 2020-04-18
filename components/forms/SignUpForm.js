import React from 'react'
import { connect } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import Error from './Error'

import { signUp } from '../../store/actions/usersActions'

class SignUpForm extends React.Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { email, password } = values
    setSubmitting(false)
    this.props.signUp(email, password)
  }
  validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

  render() {
    const { users } = this.props
    const { error } = users
    return (
      <div>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={this.validate}
          onSubmit={this.handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" data-test="email-input" />
              <ErrorMessage name="email" component="div" />
              <Field
                type="password"
                name="password"
                data-test="password-input"
              />
              <ErrorMessage name="password" component="div" />
              <button data-test="submit" type="submit" disabled={isSubmitting}>
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
    users: state.users,
  }
}

const mapDispatchToProps = {
  signUp,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm)
