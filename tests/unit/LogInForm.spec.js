import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import 'babel-polyfill'

import LogInForm from '~/components/forms/LogInForm'

import { USER_EMAIL, USER_PASSWORD } from '~/cypress/messages'

describe('Log in form', () => {
  let logInHandler, wrapper

  beforeEach(() => {
    logInHandler = jest.fn()

    wrapper = mount(<LogInForm onLogIn={logInHandler} />)
  })

  it('clicking log in', async () => {
    await act(async () => {
      await wrapper
        .find('input[data-test="email-username-input"]')
        .simulate('change', {
          persist: () => {},
          target: {
            name: 'emailOrUsername',
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

    expect(logInHandler).toHaveBeenCalledWith(USER_EMAIL, USER_PASSWORD)
  })

  it('does not fire log in if inputs are empty', () => {
    wrapper.find('[data-test="submit"]').simulate('click')

    expect(logInHandler).not.toHaveBeenCalled()
  })
})
