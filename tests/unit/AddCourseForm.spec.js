import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import 'babel-polyfill'

import AddCourseModal from '~/components/forms/AddCourseModal'

describe('AddCourseForm', () => {
  it('clicks add course', async () => {
    const courseName = 'Databases'
    const addCourseHandler = jest.fn()

    const addCourseModal = mount(
      <AddCourseModal onAddCourse={addCourseHandler} />
    )

    await act(async () => {
      await addCourseModal
        .find('input[data-test="course-name-input"]')
        .simulate('change', {
          persist: () => {},
          target: {
            name: 'courseName',
            value: courseName,
          },
        })
    })

    await act(async () => {
      await addCourseModal
        .find('form')
        .simulate('submit', { preventDefault: () => {} })
    })

    addCourseModal.find('[data-test="submit"]').simulate('click')

    expect(addCourseHandler).toHaveBeenCalledWith(courseName)
  })
})
