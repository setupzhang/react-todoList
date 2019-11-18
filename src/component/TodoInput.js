import React, { Component } from 'react'
import './style/TodoInput.css'

export default class TodoInput extends Component {
  submit = (e) => {
    if (e.key === 'Enter') {
      this.props.onSubmit(e)
    }
  }
  render() {
    return (
      <input
        className="TodoInput"
        type="text"
        value={this.props.content}
        onChange={this.props.onChange}
        onKeyPress={this.submit.bind(this)}
      />
    )
  }
}

