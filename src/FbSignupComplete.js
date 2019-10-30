import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { withRouter } from 'react-router-dom';

class FbSignupComplete extends Component {

  handleClick = (type) => {
    const { history } = this.props;
    
    if (type === 'login') {
      history.push('/login');
    } else {
      history.push('/');
    } 
  }

  render() {
    const { email } = this.props.match.params
    return (
      <Wrapper>
        <div className="innerWrapper">
          <div className="notice">
            <div className="title">Signup is successfuly registerd</div>
            <div className="content">Please check the below account for singup completion</div>
            <div className="email">{email}</div>
          </div>
          <div className="buttonArea">
            <div className="buttonWrapper"><button className="login" onClick={() => this.handleClick('login')}>Log In</button></div>
            <div className="buttonWrapper"><button className="home" onClick={() => this.handleClick('home')}>Home</button></div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default withRouter(FbSignupComplete);
const Wrapper = styled.div`
  min-height: 1000px;
  position: relative;
  z-index: 50px;
  
  padding-top: 100px;

  .innerWrapper {
    margin: 0 auto;

    width: 500px;
    height: 420px;
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
      font-size: 16px;
      color: ${oc.gray[8]};

      margin: 0 auto;
      text-align: center;
      padding: 25px 0;
    }

    .email {
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 20px;
      font-weight: bold;
      color: black;
      
      margin: 0 auto;
      text-align: center;
      padding: 20px 0;

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

        &.home {
          background: white;
          border: 1px solid #306060;
          color: #306060;

        }
  
      }

    }
  }
`;