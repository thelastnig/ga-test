import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { withRouter } from 'react-router-dom';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'; 
import AWS from 'aws-sdk';

class MyPage extends Component {

  state = {
    email: '',
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
    cognitoUser: null,
  }

  /*
  componentWillReceiveProps = (nextProps) => {
    const { cognitoUser } = this.state;
    const that = this;

    if (this.state.cognitoUser !== nextProps.cognitoUser) {
  
      cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        that.setState({
          cognitoUser: cognitoUser,
          email: result[2].getValue(),
        });
      });
    }
  }
  */

  componentWillMount = () => {
    const { cognitoUser } = this.props;
    const that = this;

    if (cognitoUser !== null) {
    
      cognitoUser.getUserAttributes(function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        that.setState({
          cognitoUser: cognitoUser,
          email: result[2].getValue(),
        });
      });

    } else {
      this.props.history.push('/');
    }
  }


  handlePasswordChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = () => {
    const { password, newPassword, newPasswordConfirm } = this.state;
    const { cognitoUser } = this.props;
    const that = this;
    
    if ( password === "" ) {
      alert("Enter your existing password!");
      return;
    }
    
    if ( newPassword === "" ) {
      alert("Enter your new password!");
      return;
    }
    
    if(newPassword !== newPasswordConfirm) {
      alert("New password and confirm password don't match");
      return;
    }

    if (cognitoUser === null) {
      alert("Warning: You are not logged in.");
      this.props.history.push('/');
      return;
    }

    cognitoUser.changePassword(password, newPassword, function(err, result) {
      if (err) {
          alert(err.message);
          return;
      }
      console.log('call result: ' + result);
      alert("Password has been successfully changed!");
      that.props.history.push('/');
    });
  }

  render() {
    const {  email, password, newPassword, newPasswordConfirm } =  this.state;
    return (
      <Wrapper>
        <div className="innerWrapper">
          <div className="notice">
            <div className="title">My Page</div>
            <div className="content email">{email}</div>
            <div className="content pwd">Change Password</div>
          </div>
          <div className="item">
            <div className="label">Password</div>
            <div className="input">
              <input className="textInput" type="password" name="password" value={password} onChange={this.handlePasswordChange}></input>
            </div>
          </div>
          <div className="item">
            <div className="label">New Password</div>
            <div className="input">
              <input className="textInput" type="password" name="newPassword" value={newPassword} onChange={this.handlePasswordChange}></input>
            </div>
          </div>
          <div className="item">
            <div className="label">New Password Confirm</div>
            <div className="input">
              <input className="textInput" type="password" name="newPasswordConfirm" value={newPasswordConfirm} onChange={this.handlePasswordChange}></input>
            </div>
          </div>
          <div className="buttonArea">
            <div className="buttonWrapper"><button className="submit" onClick={this.handleSubmit}>Submit</button></div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(MyPage);

const Wrapper = styled.div`
  min-height: 1000px;
  position: relative;
  z-index: 50px;
  
  padding-top: 100px;

  .innerWrapper {
    margin: 0 auto;

    width: 500px;
    height: 600px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 3px 7px 7px rgba(0, 0, 0, 0.1);

    .title {
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 26px;
      font-weight: bold;
      color: #306060;

      margin: 0 auto;
      text-align: center;
      padding-top: 50px;
    }

    .content {
      margin: 0 auto;

      &.pwd{
        padding-top: 25px;
        padding-bottom: 10px;
        font-size: 14px;
        font-weight: bold;
        width: 80%;
        text-align: left;
        color: ${oc.yellow[7]};
      }

      &.email{
        @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
        font-family: Roboto Slab, sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: black;
        text-align: center;
        padding: 25px 0;
      }
    }
    
    .item {
      width: 80%;
      margin: 20px auto;
    }

    .label {
      margin-bottom: 5px;
      font-size: 13px;
      font-weight: bold;
      color: ${oc.gray[8]};
    }

    .textInput {
      width: 100%;
      height: 30px;
      border: none;
      outline: none;
      border-bottom : 1px solid ${oc.gray[5]};

      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 15px;
      color: black;
      font-weight: bold;
    }

    .buttonArea{
      padding-top: 30px;
    }

    .buttonWrapper {
      width: 80%;
      margin: 0 auto;

      button {
        width: 100%;
        height: 35px;
        margin: 0 auto;
        margin-top: 20px;
        cursor: pointer;
        border: none;
        outline: none;
        background: #306060;
        border-radius: 5px;
  
        color: white;
        font-size: 14px;
        letter-spacing: 1.5px;
      }
    }
  }
`;