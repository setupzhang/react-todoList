import React, { Component } from 'react';
import './style/UserDialog.css'
import { signUp, signIn } from '../leanCloud'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class UserDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'signUp',
      formData: {
        username: '',
        password: ''
      }
    }
  }
  switch(e) {
    this.setState({
      selected: e.target.value
    })
  }
  signUp(e) {
    e.preventDefault()
    if (!this.state.username || !this.state.password) {
      alert('用户名和密码不得为空')
      return undefined
    }
    let { username, password } = this.state.formData
    let success = (user) => {
      this.props.onSignUp.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 202:
          alert('用户名已存在，换个试试')
          break
        case 201:
          alert('请输入密码 :)')
        default:
          alert(error)
          break
      }
    }
    signUp(username, password, success, error)
  }
  signIn(e) {
    e.preventDefault()
    let { username, password } = this.state.formData
    let success = (user) => {
      this.props.onSignIn.call(null, user)
    }
    let error = (error) => {
      switch (error.code) {
        case 210:
          alert('用户名与密码不匹配')
          break
        case 211:
          alert('不存在的用户名，请重新输入或注册新的账户')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }
  changeFormData = (e, key) => {
    let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
  render() {
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <div>
            <label>
              <input type="radio" value="signUp"
                checked={this.state.selected === 'signUp'}
                onChange={this.switch.bind(this)}
              /> 注册</label>
            <label>
              <input type="radio" value="signIn"
                checked={this.state.selected === 'signIn'}
                onChange={this.switch.bind(this)}
              /> 登录</label>
          </div>
          <div className="panes">
            {this.state.selected === 'signUp' ?
              <SignUpForm formData={this.state.formData}
                onSubmit={this.signUp.bind(this)}
                onChange={this.changeFormData.bind(this)}
              />
              : null}
            {this.state.selected === 'signIn' ?
              <SignInForm formData={this.state.formData}
                onChange={this.changeFormData.bind(this)}
                onSubmit={this.signIn.bind(this)}
              />
              : null}
          </div>
        </div>
      </div >
    )
  }
}