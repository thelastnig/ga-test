import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { withRouter, Link } from 'react-router-dom';
import dashboard from './image/dashboard.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class FbSignup extends Component {

  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    path: "",
    errMessage: "",
  }

  componentDidMount = () => {
    const { path } = this.props.match;
    this.setState({
      path: path
    });
    
    const firebaseConfig = {
      apiKey: "AIzaSyDB7rbog2GaI6I8ZaUlRf4hamnMDhaa36A",
      authDomain: "ga-sign-test.firebaseapp.com",
      databaseURL: "https://ga-sign-test.firebaseio.com",
      projectId: "ga-sign-test",
      storageBucket: "ga-sign-test.appspot.com",
      messagingSenderId: "172490420203",
      appId: "1:172490420203:web:24edf8c951ccd11fd0f3ae",
      measurementId: "G-1XW8Y7LN3H"
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
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
    
    if(password.length < 6) {
      this.setState({
        errMessage: "Password must be more than 6 characters"
      });
      return;
    }
    
    if(password !== passwordConfirm) {
      this.setState({
        errMessage: "Password and confirm password don't match"
      });
      return;
    }

    this.fbSignup(email, password);
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

    this.fbLogin(email, password);

  }

  fbSignup = (email, password) => {
    const that = this;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      const errorMessage = error.message;
      that.setState({
        errMessage: errorMessage
      })
    });

    this.props.history.push(`/fbsignupComplete/${email}`);
  }

  fbLogin = (email, password) => { 
    const { handleFbLogIn } = this.props;
    const that = this;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      const errorMessage = error.message;
      that.setState({
        errMessage: errorMessage
      })
    });

    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      handleFbLogIn(currentUser);
      this.props.history.push('/');
    } 
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
    const auth = firebase.auth();
    
    auth.sendPasswordResetEmail(email).then(function() {
      alert("Please check your email");

    }).catch(function(error) {
      that.setState({
        errMessage: error.message
      })
    });
  }

  render() {
    const { email, password, passwordConfirm, path, errMessage } =  this.state;
    const login = (path ===  "/fblogin" ? true : false);
    const err = (errMessage === "" ? false : true);
    return (
      <Wrapper isLogin={login}>
        <div className="outerWrapper">
          <div className="outerUpper">
            <div className="upperLeft">
              <img src={dashboard} alt={dashboard} width="25px"/>
            </div>
            <div className="upperRight">
              <button className="tapBtn login" onClick={() => this.handleChagnePath('/fblogin')}>Log In</button>
              <button className="tapBtn signup" onClick={() => this.handleChagnePath('/fbsignup')}>Sign Up</button>
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
                  <button className="submit" onClick={this.handleLoginClick}>Log In</button>
                  :
                  <button className="submit" onClick={this.handleSignupClick}>Sign Up</button>
                }
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(FbSignup);


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