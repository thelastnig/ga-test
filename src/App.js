import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import oc from 'open-color';
import Main from './Main';
import About from './About';
import Signup from './Signup';
import SignupComplete from './SignupComplete';
import Mypage from './Mypage';
import iconMenu from './image/menu.png' 
import iconModalClose from './image/iconModalClose.png' 
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'; 
import AWS from 'aws-sdk';

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FbSignup from './FbSignup';
import FbSignupComplete from './FbSignupComplete';
import FbMypage from './FbMypage';


// R 연동
import Article from './Article';

// 동의어 테스트
import Synonym from './Synonym';

// 커뮤니티 API 테스트
import Best from './Best';

// Topic Modeling for Article
import TopicModel from './TopicModel'

class App extends Component {

  state = {
    isModalVisible: false,
    
    // cognito
    email: '',
    isLogin: false,
    cognitoUser: null,


    // Firebase
    isFb: false,
    fbEmail: '',
    fbIsLogin: false,
    fbCurrentUser: null,
  }

  /*
  handleAlertEvent = (category, action, label) => {
    window.alert(`Event - category: ${category}, action: ${action}, label: ${label}`);
  }
  */

  componentDidMount() {
    const that = this;

    // coginto
    const data = {
      UserPoolId : 'ap-northeast-2_QBB8o4gc7', // Your user pool id here
      ClientId : '1ftngbgjnmn0e1bhtkkr0dr1gl' // Your client id here
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(data);
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
              console.log(err);
              return;
            }
            console.log('session validity: ' + session.isValid());
            console.log(session.getIdToken().getJwtToken());
            console.log('cognitoUser--------------------------');
            console.log(cognitoUser);
            that.setState({
              isLogin: true,
              cognitoUser: cognitoUser
            });

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId : '...',
              Logins : {
                  'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : session.getIdToken().getJwtToken()
              }
            });
        });
    }


    // firebase
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

    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      this.setState({
        fbCurrentUser: currentUser,
        fbIsLogin: true,
      })
    } 
    
  }

  handleChange = (e) => {
    const email = e.target.value;
    this.setState({
      email: email
    });
  }

  handleClickClose = () => {
    this.setState({
        isModalVisible: false,
        email: '',
      }
    );
  }

  handleClick = (type) => {
    if (type === 'subscribe') {
      this.setState({
          isModalVisible: true,
        }
      );
      //this.handleAlertEvent('button', 'click', 'subscribe-begin');
      window.ga('send', 'event', 'button', 'click', 'subscribe-begin');
    } else {
      this.setState({
          isModalVisible: false,
          email: '',
        }
      );
      //this.handleAlertEvent('button', 'click', 'subscribe-complete');
      window.ga('send', 'event', 'button', 'click', 'subscribe-complete');
    }
  }

  handleLogIn = (cognitoUser) => {
    this.setState({
      isLogin: true,
      cognitoUser: cognitoUser
    });
  }

  handleLogOut = () => {
    const { cognitoUser } = this.state;
    if (cognitoUser != null) {
      cognitoUser.signOut();
      this.setState({
        isLogin: false,
        cognitoUser: null
      });
      window.location.reload();
    }
  }

  // Firebase
  handleFbLogIn = (fbCurrentUser) => {
    this.setState({
      fbIsLogin: true,
      fbCurrentUser: fbCurrentUser
    });
  }

  handleFbLogOut = () => {
    firebase.auth().signOut();
    this.setState({
      fbEmail: '',
      fbIsLogin: false,
      fbCurrentUser: null,
    }, function(){
      window.location.reload();
    });
  }
  
  render() {
    const { isModalVisible, isFb, fbIsLogin } = this.state;
    const isLogin = (this.state.isLogin ? true : false);
    const { handleLogIn, handleFbLogIn } = this;
    return (
      <BrowserRouter>
        <ModalWrapper isModalVisible={isModalVisible}/>
        <Modal isModalVisible={isModalVisible}>
          <div className="close" onClick={this.handleClickClose}>
            <img src={iconModalClose} alt={iconModalClose} height="16px"/>
          </div>
          <div className="info">Subscribe</div>
          <div className="inmputName">What is your email?</div>
          <div className="inputWrapper">
            <input className="input" type="text" placeholder="davidgandy@gandy.md" value={this.state.email} onChange={this.handleChange}/>
          </div>
          <div className="btn" onClick={(e) => this.handleClick('complete')} >
            COMPLETE
            <div className="tooltipTriangle"/>
            <div className="tooltip">7. Event : Click</div>
          </div>
        </Modal>
        <Header>
          <div className="left"><Link className="link" to='/'>David James Gandy</Link></div>
          <div className="center">BRITISH MALE MODEL AGENCY</div>
          <div className="right">
            {
              isFb
              ? 
              <Fragment>
                {
                  fbIsLogin
                  ?
                  <Fragment>
                    <button className="login" onClick={this.handleFbLogOut}>Log Out</button>
                    <Link className="link" to='/fbmypage'><button className="login mypage">My Page</button></Link>
                  </Fragment>
                  :
                  <Link className="link" to='/fblogin'><button className="login">Log In</button></Link>
                }
              </Fragment>
              :
              <Fragment>
                {
                  isLogin
                  ?
                  <Fragment>
                    <button className="login" onClick={this.handleLogOut}>Log Out</button>
                    <Link className="link" to='/mypage'><button className="login mypage">My Page</button></Link>
                  </Fragment>
                  :
                  <Link className="link" to='/login'><button className="login">Log In</button></Link>
                }
              </Fragment>
            }
            <img src={iconMenu} alt={iconMenu} height="20px"/>
          </div>
        </Header>
        <Content>
          <div className="Wrapper">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/campaign" component={Main} />
              <Route exact path="/about" component={About} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/signupComplete/:email" component={SignupComplete} />
              <Route exact path="/login" render={() => <Signup handleLogIn={handleLogIn} />}/>
              <Route exact path="/mypage" render={() => <Mypage isLogin={this.state.isLogin} cognitoUser={this.state.cognitoUser} />}/>


              <Route exact path="/fbsignup" component={FbSignup} />
              <Route path="/fbsignupComplete/:email" component={FbSignupComplete} />
              <Route exact path="/fblogin" render={() => <FbSignup handleFbLogIn={handleFbLogIn} />}/>
              <Route exact path="/fbmypage" render={() => <FbMypage fbIsLogin={this.state.fbIsLogin} fbCurrentUser={this.state.fbCurrentUser} />}/>

              <Route path="/article" component={Article} />

              <Route path="/synonym" component={Synonym} />

              <Route path="/best" component={Best} />

              <Route path="/topicmodel" component={TopicModel} />
            </Switch>
          </div>
        </Content>
        <Footer>
          <div className="maintext">
            Let's work together
          </div>
          <div className="footerBtn" onClick={(e) => this.handleClick('subscribe')}>
            SUBSCRIBE
            <div className="tooltipTriangle"/>
            <div className="tooltip">6. Event : Click</div>
          </div>
          <div className="info">
            <div className="infoLeft">LONDON, UK</div>
            <div className="infoCenter">&#169;&nbsp;COPYRIGHT DAVID GANDY OFFICIAL</div>
            <div className="infoRight">DAVIDGANDY@GANDY.MD</div>
          </div>
        </Footer>
      </BrowserRouter>
    );
  }
}

export default App;

const ModalWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 0;
background-color: rgba(0, 0, 0, 0);

  ${props => props.isModalVisible && `
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 50;
    transition-property: all;
    transition-duration: 1s;
  `}
`;

const Modal = styled.div`
  width: 520px;
  height: 440px;
  position: fixed;
  z-index: 54;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #EFECEA;
  border-radius: 7px;
  display: none;

  ${props => props.isModalVisible && `
    display: block;
  `}

  .close {
    text-align: right;
    padding: 20px 20px;
    cursor: pointer;
  }

  .info {
    padding-left: 20px;
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: ${oc.gray[8]};
  }

  .inmputName {
    padding-left: 20px;
    padding-top: 50px;
    padding-bottom: 20px;
    font-size: 22px;
    letter-spacing: 1px;
    line-height: 1.6;
    color: #79726E;
  }

  .inputWrapper {
    padding-left: 20px;
    
    .input {
      width: 94%;
      height: 40px;
      border: none;
      outline: none;
      background: transparent;
      border-bottom: 2px solid ${oc.gray[8]};
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 18px;
      letter-spacing: 1.5px;
      
      &::placeholder {
        color: ${oc.gray[5]};
      }
    }
  }

  .btn {
    position: relative;
    padding-top: 70px;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;

    font-size: 14px;
    letter-spacing: 1px;
    color: ${oc.pink[7]};

    &:hover {
      text-decoration: underline;
    }
  }
  
  .tooltip {
    position: absolute;
    width: 100px;
    top: 108px;
    left: 50%;
    transform: translateX(-50%);
    padding: 7px;
    color: white;
    font-size: 12px;
    background: black;
    border-radius: 3px;
    text-align: center;
    line-height: 1.6;
  }

  .tooltipTriangle {
    position: absolute;
    top: 99px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 10px 5px;
    border-color: transparent transparent #000000 transparent;
  }

`;

const Header = styled.div`
  width: 100%;
  height: 130px;
  background: #EFECEA;
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  .left {
    width: 30%;
    padding-left: 40px;

    .link {
      text-decoration: none;

      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 30px;
      font-weight: 600;
      letter-spacing: 1.5px;
      color: ${oc.gray[8]};
    }
  }

  .center {
    width: 50%;
    text-align: center;

    font-size: 12px;
    letter-spacing: 3px;
    color: #79726E;
  }

  .right {
    text-align: center;
    width: 20%;
    padding-left: 0px;

    .login {
      width: 70px;
      height: 30px;
      margin: 0 auto;
      margin-right: 20px;
      cursor: pointer;
      outline: none;
      border-radius: 5px;
      background: ${oc.gray[6]};
      border: none;
      color: white;


      font-size: 12px;
      letter-spacing: 1.5px;

      &.mypage {
        width: 75px;
        background: transparent;
        border: 1px solid ${oc.gray[6]};
        color: ${oc.gray[6]};
        font-weight: 600;

      }
    }

    }

  }
`;

const Content = styled.div`
  width: 100%;
  background: #EFECEA;

  .Wrapper {
    width: 1200px;
    margin: 0 auto;
  }
`;

const Footer = styled.div`
  width: 100%;
  position: relative;
  height: 440px;
  background: white;
  z-index: 2;

  .maintext {
    text-align: center;
    margin-top: 50px;

    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 60px;
    letter-spacing: 1.5px;
    color: ${oc.gray[8]};
  }

  .footerBtn {
    position: relative;

    width: 200px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 140px;
    text-align: center;

    font-size: 14px;
    letter-spacing: 1px;
    color: ${oc.pink[7]};

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    font-size: 12px;
    letter-spacing: 3px;
    color: #79726E;

    .infoLeft {
      width: 30%;
    }

    .infoCenter {
      width: 40%;
    }

    .infoRight {
      width: 30%;
    }
  }
  
  .tooltip {
    position: absolute;
    width: 100px;
    top: 38px;
    left: 50%;
    transform: translateX(-50%);
    padding: 7px;
    color: white;
    font-size: 12px;
    background: black;
    border-radius: 3px;
    text-align: center;
    line-height: 1.6;
  }

  .tooltipTriangle {
    position: absolute;
    top: 29px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 10px 5px;
    border-color: transparent transparent #000000 transparent;
  }

`;
