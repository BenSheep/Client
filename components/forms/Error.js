import React from 'react'

export default class Error extends React.Component {
  render() {
    const { error } = this.props
    return (
      <h1 className="text-red text-4xl" data-test="error-message">
        {error.message}
      </h1>
    )
  }
}
