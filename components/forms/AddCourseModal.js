import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default class AddCourseModal extends Component {
  handleOnSubmit = (values, { setSubmitting }) => {
    const { courseName } = values
    const { onAddCourse } = this.props

    onAddCourse(courseName)
  }

  render() {
    return (
      <div data-test="add-course-modal">
        <Formik
          initialValues={{ courseName: '' }}
          validate={this.validate}
          onSubmit={this.handleOnSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="md:pt-8">
              <Field
                className="w-4/5 rounded-lg py-4 md:py-6 border-2 border-solid border-silver focus:border-blue text-darkgray outline-none pl-4 text-xl"
                type="text"
                name="courseName"
                placeholder="Course name"
                data-test="course-name-input"
              />
              <ErrorMessage
                name="courseName"
                component="div"
                className="w-4/5 mx-auto text-left text-red pl-1"
                data-test="error-message"
              />
              <button
                className="mt-12 md:py-6 w-4/5 cta-lg text-xl uppercase"
                data-test="submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding course...' : 'Add course'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}
