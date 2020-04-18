import React from 'react'

export default class Error extends React.Component {
  render() {
    const { error } = this.props
    return (
      <div
        className="w-4/5 mx-auto pl-1 text-left text-red"
        data-test="error-message"
      >
        {error.message}
      </div>
    )
  }
}
