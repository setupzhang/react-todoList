import React, { Component } from 'react';

export default class SignUpForm extends Component {
  render() {
    return (
      <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* 注册*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.props.formData.username}
            onChange={(e)=>this.props.onChange(e,'username')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.props.formData.password}
            onChange={(e)=>this.props.onChange(e,'password')} />
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
    )
  }
}