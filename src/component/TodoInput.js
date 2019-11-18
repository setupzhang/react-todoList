import React, { Component } from 'react';

export default class TodoInput extends Component {
  submit = (e) => {
    if (e.key === 'Enter') {
      this.props.onSubmit(e)
    }
  }
  render() {
    return (
      <input type="text" value={this.props.content}
        onChange={this.props.onChange}
        onKeyPress={this.submit.bind(this)} />
    )
  }
}
