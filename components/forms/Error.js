import React from 'react'

export default class Error extends React.Component {
  render() {
    const { error } = this.props
    return (
      <h1 className="text-left pl-16 text-red" data-test="error-message">
        {error.message}
      </h1>
    )
  }
}
