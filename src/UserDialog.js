import React, { Component } from 'react';
import './UserDialog.css';
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud';
import SignInOrSignUp from './SignInOrSignUp';
import ForgotPasswordForm from './ForgotPasswordForm';
import { copyState } from './App.js';

class UserDialog extends Component{
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'signInOrSignUp',
      formData: {
        email: '',
        username: '',
        password: '',
      }
    }
  }
  signUp(e){
    e.preventDefault()
    let {email, username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignUp(user)
    }
    let error = (error)=>{
      switch(error.code){
        case 125:
          alert('电子邮箱地址无效')
          break
        case 202:
          alert('用户名已经被占用')
          break
        case 203:
          alert('电子邮箱已经被占用')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email, username, password, success, error)
  }
  signIn(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignIn.call(null, user)
    }
    let error = (error)=>{
      switch(error.code){
        case 210:
          alert('用户名与密码不匹配')
          break
        case 211:
          alert('找不到用户')
          break
        default:
          alert(error)
          break
      }
    }
    signIn(username, password, success, error)
  }
  changeFormData(key, e){
    let stateCopy = copyState(this.state)
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
  render(){
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ?
            <SignInOrSignUp formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)}
            /> : 
            <ForgotPasswordForm formData={this.state.formData}
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)}
            />}
        </div>
      </div>
    )
  }
  showForgotPassword(){
    let stateCopy = copyState(this.state)
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  returnToSignIn(){
    let stateCopy = copyState(this.state)
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault()
    let email = this.state.formData.email
    let success = ()=>{
      alert('已发送重置密码邮件，请检查您的收件箱')
    }
    let error = (error)=>{
      switch(error.code){
        case 205:
          alert('找不到邮箱地址对应的用户')
          break
        default:
          alert('error')
          break
      }
    }
    sendPasswordResetEmail(email, success, error)
  }
}

export default UserDialog;