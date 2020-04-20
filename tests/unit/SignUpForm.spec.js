import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import 'babel-polyfill'

import SignUpForm from '../../components/forms/SignUpForm'

import { USER_EMAIL, USER_PASSWORD } from '../../cypress/messages'

describe('Sign up form', () => {
  it('clicking sign up', async () => {
    const signUpHandler = jest.fn()

    const wrapper = mount(<SignUpForm onSignUp={signUpHandler} />)

    await act(async () => {
      await wrapper.find('input[data-test="email-input"]').simulate('change', {
        persist: () => {},
        target: {
          name: 'email',
          value: USER_EMAIL,
        },
      })
    })

    await act(async () => {
      await wrapper
        .find('input[data-test="password-input"]')
        .simulate('change', {
          persist: () => {},
          target: {
            name: 'password',
            value: USER_PASSWORD,
          },
        })
    })

    await act(async () => {
      await wrapper
        .find('form')
        .simulate('submit', { preventDefault: () => {} })
    })

    wrapper.find('[data-test="submit"]').simulate('click')

    expect(signUpHandler).toHaveBeenCalledWith(USER_EMAIL, USER_PASSWORD)
  })
})
