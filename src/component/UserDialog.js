import React, { Component } from 'react';
import './style/UserDialog.css'
import {signUp} from '../leanCloud'

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
  signUp(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignUp.call(null, user)
    }
    let error = (error)=>{
      console.log(error)
    }
    signUp(username, password, success, error)
  }
  signIn(e) { }
  changeFormData = (e,key) =>{
    let stateCopy = JSON.parse(JSON.stringify(this.state))  // 用 JSON 深拷贝
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy,()=>console.log(this.state))
  }
  render() {
    let signUpForm = (
      <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.state.formData.username}
            onChange={(e)=>this.changeFormData(e,'username')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.state.formData.password}
            onChange={(e)=>this.changeFormData(e,'password')} />
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
    )
    let signInForm = (
      <form className="signIn" onSubmit={this.signIn.bind(this)}> {/* 登录*/}
        <div className="row">
          <label>用户名</label>
          <input type="text" value={this.state.formData.username}
            onChange={(e)=>this.changeFormData(e,'username')} />
        </div>
        <div className="row">
          <label>密码</label>
          <input type="password" value={this.state.formData.password}
            onChange={(e)=>this.changeFormData(e,'password')} />
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