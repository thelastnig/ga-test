import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import oc from 'open-color';
import Main from './Main';
import About from './About';
import iconMenu from './image/menu.png' 
import iconModalClose from './image/iconModalClose.png' 

class App extends Component {

  state = {
    isModalVisible: false,
    email: '',
  }

  handleAlertEvent = (category, action, label) => {
    window.alert(`Event - category: ${category}, action: ${action}, label: ${label}`);
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
      this.handleAlertEvent('button', 'click', 'subscribe-begin');
      window.ga('send', 'event', 'button', 'click', 'subscribe-begin');
    } else {
      this.setState({
          isModalVisible: false,
          email: '',
        }
      );
      this.handleAlertEvent('button', 'click', 'subscribe-complete');
      window.ga('send', 'event', 'button', 'click', 'subscribe-complete');
    }
  }

  render() {
    const { isModalVisible } = this.state;
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
            <img src={iconMenu} alt={iconMenu} height="20px"/>
          </div>
        </Header>
        <Content>
          <div className="Wrapper">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/campaign" component={Main} />
              <Route exact path="/about" component={About} />
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
    width: 60%;
    text-align: center;

    font-size: 12px;
    letter-spacing: 3px;
    color: #79726E;
  }

  .right {
    text-align: center;
    width: 10%;
    padding-left: 0px;

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
