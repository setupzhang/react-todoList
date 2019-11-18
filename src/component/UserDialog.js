import React, { Component } from 'react';
import './style/UserDialog.css'
export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'signUp'
    }
  }
  switch(e) {
    console.log(1)
    this.setState({
      selected: e.target.value
    })
  }
  render() {
    let signUpForm = (
      <form className="signUp"> {/* 注册*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" />
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
    )
    let signInForm = (
      <form className="signIn"> {/* 登录*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" />
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
        </div>
      </form>
    )
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <div onChange={this.switch.bind(this)}>
            <label><input
              type="radio"
              value="signUp"
              name='xxx'
              checked={this.state.selected === 'signUp'} /> 注册</label>
            <label><input
              type="radio"
              value="signIn"
              name='xxx'
              checked={this.state.selected === 'signIn'} /> 登录 </label>
          </div>
          <div className="panes">
            {this.state.selected === 'signUp' ? signUpForm : signInForm}
          </div>
        </div>
      </div >
    )
  }
}