import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import { withRouter, Link } from 'react-router-dom';
import dashboard from './image/dashboard.png'
//import * as jwt_decode from 'jwt-decode';

import { GoogleLogin } from 'react-google-login';

class Signup extends Component {

  state = {
    // cognito with email
    email: "",
    password: "",
    passwordConfirm: "",
    path: "",
    errMessage: "",

    // cognito with google
    gmail: '',
    provider: 'google',
  }

  componentWillMount = () => {
    const { path } = this.props.match;
    this.setState({
      path: path
    });
  }

  handleChagnePath = (type) => {
    this.setState({
      path: type
    });
    this.props.history.push(type);
  }

  handleSignupChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSignupClick = () => {
    const { email, password, passwordConfirm } = this.state;

    const regExp =  /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    
    if (email.match(regExp) === null) {
      this.setState({
        errMessage: "Invalid email"
      });
      return;
    }
    
    if(password === '' || passwordConfirm === '') {
      this.setState({
        errMessage: "Please enter all contents"
      });
      return;
    }
    
    if(password !== passwordConfirm) {
      this.setState({
        errMessage: "Password and confirm password don't match"
      });
      return;
    }

    this.cogintoSignup(email, password);
  }

  handleLoginClick = () => {
    const { email, password } = this.state;

    const regExp =  /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    
    if (email.match(regExp) === null) {
      this.setState({
        errMessage: "Invalid email"
      });
      return;
    } 

    this.cogintoLogin(email, password);
  }

  cogintoSignup = (email, password) => {

    const { history } = this.props;
    const that = this;

    const poolData = {
      UserPoolId : 'ap-northeast-2_QBB8o4gc7', // Your user pool id here
      ClientId : '1ftngbgjnmn0e1bhtkkr0dr1gl' // Your client id here
    };
       
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
       /*
       var attributeList = [];
       var dataEmail = {
               Name : 'email',
               Value : 'thelastnig@gmail.com'
           };
       
       var dataPassword = {
          Name : 'password',
               Value : '1234567'
           };
       
       var attributeEmail = new CognitoUserAttribute(dataEmail);
       var attributePassword = new CognitoUserAttribute(dataPassword);
       
       attributeList.push(attributeEmail);
       attributeList.push(attributePassword);
       */

    userPool.signUp(email, password, null, null, function(err, result){   //username: bellayang, userpwd: Bellayang1
      if (err) {
        console.log(err.message);
        that.setState({
          errMessage: err.message
        })
        return;
      }
      const cognitoUser = result.user;
      const userEmail = cognitoUser.getUsername()
      console.log('user account is ' + userEmail);
      history.push(`/signupComplete/${userEmail}`);
    });
  }

  cogintoLogin = (email, password) => { 
    const { history, handleLogIn } = this.props;
    const that = this;    

    const poolData = {
      UserPoolId : 'ap-northeast-2_QBB8o4gc7', // Your user pool id here
      ClientId : '1ftngbgjnmn0e1bhtkkr0dr1gl' // Your client id here
    };
       
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
    var userData = { 
      Username : email,
      Pool : userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    var authenticationData = {
      Username : email,
      Password : password,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.idToken.jwtToken;

          console.log('authentication successful!');
          console.log('accessToken*----------------------');
          console.log(accessToken);
          console.log('idToken*----------------------');
          console.log(idToken);
          handleLogIn(cognitoUser);
          history.push(`/`);
      },

      onFailure: function(err) {
          console.log(err.message);
          that.setState({
            errMessage: err.message
          });
      },

      mfaRequired: function(codeDeliveryDetails) {
          var verificationCode = prompt('Please input verification code' ,'');
          cognitoUser.sendMFACode(verificationCode, this);
      }
    });
  }

  handleFogotPassword = () => {

    const { email } = this.state;
    const that = this;

    if (email === '') {
      alert("Warning: Enter your account.");
      return;
    }

    const regExp =  /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    
    if (email.match(regExp) === null) {
      this.setState({
        errMessage: "Invalid email"
      });
      return;
    } 

    const poolData = {
      UserPoolId : 'ap-northeast-2_QBB8o4gc7', 
      ClientId : '1ftngbgjnmn0e1bhtkkr0dr1gl' 
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: email,
      Pool: userPool
    });

    cognitoUser.forgotPassword({
    onSuccess: function (result) {
        console.log('call result: ' + result);
    },
    onFailure: function(err) {
      that.setState({
        errMessage: err.message
      })
    },
    inputVerificationCode() {
        var verificationCode = prompt('Check your email and input verification code ' ,'');
        var newPassword = prompt('Enter new password ' ,'');
        cognitoUser.confirmPassword(verificationCode, newPassword, {
          onFailure: (err) => {
            that.setState({
              errMessage: err.message
            })
          },
          onSuccess: (res) =>  {
            alert("New password has been successfully registered. Please log in using new password");
          },
      });
      }
    });
  }

  handleloginWithGoogleSuccess = (res) => {
    console.log("success");
    const idToken = res.Zi.id_token;

    AWS.config = {
      region: 'ap-northeast-2' ,
      IdentityPoolId: 'ap-northeast-2:458e68c4-23ec-49a9-b22d-a135e0534f54',
      UserPoolId: 'ap-northeast-2_w2esx2eLN',
      ClientId: '57ol93v8ae64m6lcsduutblrdd',
    };


    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
       IdentityPoolId: 'ap-northeast-2:458e68c4-23ec-49a9-b22d-a135e0534f54',
       Logins: {
          'accounts.google.com': idToken
       }
    });
    AWS.config.credentials.get(err => {
        if (err) {
          console.log(err);
        }
    });
    
  }

  handleloginWithGoogleError = (err) => {
    this.setState({
      errMessage: err.message
    })
  }


  

  render() {
    const { email, password, passwordConfirm, path, errMessage } =  this.state;
    const login = (path ===  "/login" ? true : false);
    const err = (errMessage === "" ? false : true);
    return (
      <Wrapper isLogin={login}>
        <div className="outerWrapper">
          <div className="outerUpper">
            <div className="upperLeft">
              <img src={dashboard} alt={dashboard} width="25px"/>
            </div>
            <div className="upperRight">
              <button className="tapBtn login" onClick={() => this.handleChagnePath('/login')}>Log In</button>
              <button className="tapBtn signup" onClick={() => this.handleChagnePath('/signup')}>Sign Up</button>
            </div>
          </div>
          <div className="outerLower">
            <p className="title">{login ? "Thank you for comming!" : "Welcome!"}</p>
            <p>{login ? "Log in" : "Sign up"} to continue</p>
          </div>
          <div className="innerWrapper">
            <div className="signup">
              <div className="item">
                <div className="label">Email Address</div>
                <div className="input">
                  <input className="textInput" type="text" name="email" value={email} onChange={this.handleSignupChange}></input>
                </div>
              </div>
              <div className="item">
                <div className="label">Password</div>
                <div className="input">
                  <input className="textInput" type="password" name="password" value={password} onChange={this.handleSignupChange}></input>
                </div>
              </div>
              {
                login 
                ? 
                null
                :
                <div className="item">
                  <div className="label">Password Confirm</div>
                  <div className="input">
                    <input className="textInput" type="password" name="passwordConfirm" value={passwordConfirm} onChange={this.handleSignupChange}></input>
                  </div>
                </div>
              }
              {
                err
                ?
                <div className="info">{errMessage}</div>
                :
                <div className="info"></div>
              }
              {
                login
                ? 
                <div className="additionalOption"><button className="fotgotBtn" onClick={this.handleFogotPassword}>Forgot password?</button></div>
                :
                <div className="additionalOption"></div>
              }
              <div className="button">
                {
                  login 
                  ?
                  <Fragment>
                    <button className="submit" onClick={this.handleLoginClick}>Log In</button>
                    <GoogleLogin className="google"
                      clientId="792142707592-3vbqu7n9i520npjk3jsfoj6m832s4nat.apps.googleusercontent.com"
                      buttonText="with Google"
                      onSuccess={this.handleloginWithGoogleSuccess}
                      onFailure={this.handleloginWithGoogleError}
                    />
                  </Fragment>
                  :
                  <Fragment>
                    <button className="submit" onClick={this.handleSignupClick}>Sign Up</button>
                    <button className="submit" onClick={this.handleLoginClick}>Sign Up with Google</button>
                  </Fragment>
                }
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(Signup);


const Wrapper = styled.div`
  min-height: 1000px;
  position: relative;
  z-index: 50px;
  padding-top: 50px;

  .outerWrapper {
    margin: 0 auto;
    width: 375px;
    
    background: #306060;
    border-radius: 20px;
    box-shadow: 0 3px 7px 7px rgba(0, 0, 0, 0.3);

    .outerUpper, .outerLower {
      height: 100px;
      padding-right: 20px;
      padding-left: 20px;

      p {
        color: white;
        font-size: 12px;

        &.title {
          @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
          font-family: Roboto Slab, sans-serif;
          font-size: 26px;
          letter-spacing: 1.2px;
        }
      }
    }

    .outerUpper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .upperLeft {

      }

      .upperRight {

        .tapBtn {
          width: 70px;
          outline: none;
          border: none;
          background: #306060;
          color: white;
          font-size: 15px;
          cursor: pointer;

          &.signup {
            width: 95px;
            border-bottom: 1px solid white;
          }

          ${props => props.isLogin && `

            &.signup {
              border-bottom: none
            }

            &.login {
              border-bottom: 1px solid white;
            }
          
          `}
        }
      }
    }
  }

  .innerWrapper {
    width: 100%;
    height: 467px;

    background: white;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;

  }

  .signup {
    padding-left: 20px;
    padding-right: 20px;

    flex: 1;

    .item {
      margin: 20px 0;
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

    .submit {
      width: 100%;
      height: 35px;
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

    .google {
      width: 100%;
      height: 45px;
      cursor: pointer;
      margin-top: 15px;
      outline: none;

    }

    .info {
      width: 100%;
      height: 30px;
      font-size: 12px;
      color: ${oc.pink[8]};
    }

    .additionalOption {
      width: 100%;
      height: 25px;
      text-align: right;

      .fotgotBtn {
        border: none;
        outline: none;
        color: ${oc.yellow[7]};
        font-size: 14px;
        font-weight: 600;
        background: transparent;
        cursor: pointer;
      }

    }
  }
`;