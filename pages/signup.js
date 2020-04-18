import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default class SignUp extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form>
            <Field type="email" name="email" data-test="email-input" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" data-test="password-input" />
            <ErrorMessage name="password" component="div" />
            <button data-test="submit" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    )
  }
}
