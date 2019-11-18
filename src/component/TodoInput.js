import React, { Component } from 'react';

export default class TodoInput extends Component {
  submit = (e)=> {
    if (e.key === 'Enter') {
      this.props.onSubmit(e)
    }
  }
  render() {
    return (
      <input type="text" defaultValue={this.props.content}
        onKeyPress={this.submit} />
    )
  }
}
