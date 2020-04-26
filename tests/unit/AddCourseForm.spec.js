import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import 'babel-polyfill'

import AddCourseModal from '~/components/forms/AddCourseModal'

describe('AddCourseForm', () => {
  let courseName, addCourseHandler, addCourseModal, clickOutsideHandler

  beforeEach(() => {
    courseName = 'Databases'
    addCourseHandler = jest.fn()
    clickOutsideHandler = jest.fn()

    addCourseModal = mount(
      <AddCourseModal
        onAddCourse={addCourseHandler}
        onClickOutside={clickOutsideHandler}
      />
    )
  })
  it('clicks add course', async () => {
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
  }),
    it('clicks add course without giving a name and fails', async () => {
      await act(async () => {
        await addCourseModal
          .find('form')
          .simulate('submit', { preventDefault: () => {} })
      })

      addCourseModal.find('[data-test="submit"]').simulate('click')

      expect(addCourseHandler).not.toHaveBeenCalled()
    })
})
