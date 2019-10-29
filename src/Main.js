import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import ReactPlayer from 'react-player'

import gandy1 from './image/gandy1.jpg'
import gandy4 from './image/gandy4.jpg'

class Main extends Component {

  state = {
  isSecondItemVisible: false,
  isThridItemVisible: false,
  isLowerItemVisible: false,
  isScrollCompelete: false,
  isTooltipVisible: false,
}

componentDidMount() {
  window.scrollTo(0, 0);
  window.addEventListener("scroll", this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
}



handleScroll = () => {
  const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  if (scrollTop + 500 >= this.secondItem.offsetTop) {
    this.setState({
      isSecondItemVisible: true
    });
  } 
  if (scrollTop + 500 >= this.thirdItem.offsetTop) {
    this.setState({
      isThridItemVisible: true
    });
  }
  if (scrollTop + 500 >= this.lowerItem.offsetTop) {
    this.setState({
      isLowerItemVisible: true,
    });

  }
  if (scrollTop + 500 < this.lowerItem.offsetTop) {
    this.setState({
      isLowerItemVisible: false,
    });
  }
  if (scrollTop + 374 >= this.thirdItem.offsetTop) {
    const { isScrollCompelete } = this.state;
    if (isScrollCompelete === true) {
      return;
    }
    
    //this.handleAlertEvent('scroll', 'scroll-down', 'main-page-scroll-complete');
    //window.ga('send', 'event', 'scroll', 'scroll-down', 'main-page-scroll-complete');
    this.setState({
      isScrollCompelete: true
    });
    
  }
};



  handleClickAbout = (type) => {
    if (type === 'video') {
      //this.handleAlertEvent('video', 'play', 'GQ Taiwan');
      window.ga('send', 'event', 'video', 'play', 'GQ Taiwan');
    } else if (type === 'download') {
      //this.handleAlertEvent('button', 'click', 'download');
      window.ga('send', 'event', 'button', 'click', 'download');
    } else {
      this.props.history.push('/about');
      //this.handleAlertEvent('button', 'click', type);
      window.ga('send', 'event', 'button', 'click', 'view more');
    }
  }

  handleClickImg = () => {
    //window.alert('Thank you!');
  }


  handleAlertEvent = (category, action, label) => {
    //window.alert(`Event - category: ${category}, action: ${action}, label: ${label}`);
  }

  
  render() {
    const { isSecondItemVisible, isThridItemVisible, isLowerItemVisible, isTooltipVisible } = this.state;
    return (
      <Wrapper isSecondItemVisible={isSecondItemVisible} isThridItemVisible={isThridItemVisible} isLowerItemVisible={isLowerItemVisible} isTooltipVisible={isTooltipVisible}>
        <div className="item first">
          <div className="itemInner first">
            <div className="left">
              <div>In an industry dominated by skinny models, Gandy's muscular build caused some menswear fashion designers change standards.</div>
                <div className="firstBtn" onClick={(e) => this.handleClickAbout('view more')}>
                  &larr;&nbsp;VIEW MORE
                <div className="tooltipTriangle"/>
                <div className="tooltip">2. Event : Click</div>
              </div>
            </div>
            <div className="right">
              <img src={gandy1} alt={gandy1} ref={ref => this.img = ref}/>
            </div>
          </div>
          <div className="title">The most successful model<br/>in the male model history</div>
          <div className="sideBtn" onClick={(e) => this.handleClickAbout('download')}>
            <a href={gandy1} download><div className="sideLeft">N&deg;&nbsp;1</div><div className="sideCenter">DOWNLOAD</div></a>
          </div>
          <div className="tooltipTriangle download"/>
          <div className="tooltip download">1. Event : Download</div>
        </div>
        <div className="item second" ref={ref => this.secondItem = ref}>
          <div className="itemInner second">
            <div className="left">
              <img src={gandy4} alt={gandy4} height="700px"/>
            </div>
            <div className="right">
              <p>In May 2010, Gandy spoke at the University of Oxford Union as part of a panel that included photographer Tony McGee, 
              Victoria and Albert Museum senior curator Claire Wilcox, fashion consultant Frances Card and Dolly Jones, the editor of British Vogue.<br/><br/>
              Prior notable speakers who have debated in the Oxford Union include Winston Churchill, Queen Elizabeth and Mother Teresa.<br/><br/>
              He released the "David Gandy Men's Style Guide" mobile app in 2010 which offered style and clothing advice to men and which ultimately hit Top 3 in the Lifestyle market.</p>
              <div className="secondBtn" onClick={(e) => this.handleClickAbout('learn more')}>
                &larr;&nbsp;LEARN MORE
                <div className="tooltipTriangle"/>
                <div className="tooltip">3. Event : Click</div>
              </div>
            </div>
          </div>
          <div className="title">Fashion Projects</div>
        </div>
        <div className="item third" ref={ref => this.thirdItem = ref}>
          <div className="itemInner third">
            <div className="left" >
              <ReactPlayer url='https://youtu.be/WngAdbeqb2E' controls onPlay={(e) => this.handleClickAbout('video')}/>
              <div className="tooltipTriangle youtube"/>
              <div className="tooltip youtube">4. Event : Play</div>
            </div>
            <div className="right">
              Gandy has been nominated for or received several awards in the modelling industry. In 2008, Spanish Glamour magazine named him "Most Beautiful International Male Face" at an event in Madrid, Spain.
              <div className="tooltipTriangle scroll"/>
              <div className="tooltip scroll">5. Event : Scroll</div>
            </div>
          </div>
          <div className="title">Accolades</div>
        </div>
        <div className="lowerArea" ref={ref => this.lowerItem = ref}>
          <div className="left">
            <div className="tri1"></div>
            <div className="tri2"></div>
          </div>
          <div className="right">
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Main;

const Wrapper = styled.div`
  width: 100%;

  .item {
    width: 100%;
    position: relative;

    .sideBtn {
      position: absolute;
      top: 50px;
      right: -50px;

      cursor: pointer;

      .sideLeft {
        display: inline-block;
        @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
        font-family: Roboto Slab, sans-serif;
        color: #79726E;
        font-size: 18px;
      }

      .sideCenter {
        display: inline-block;
        text-align: center;
        margin-left: 10px;
        padding: 5px;
        border-bottom: 2px solid #79726E;
        font-size: 11px;
        letter-spacing: 2px;
        color: #79726E;
      }
    }

    &.first {
      margin-bottom: 250px;

      .title {
        @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
        font-family: Roboto Slab, sans-serif;
        font-size: 40px;
        letter-spacing: 1.5px;
        color: ${oc.gray[7]};

        position: absolute;
        top: 160px;
        left: 0;
      }
    }

    &.second {
      margin-bottom: 250px;

      .title {
        @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
        font-family: Roboto Slab, sans-serif;
        font-size: 70px;
        font-weight: 600px;
        letter-spacing: 3px;
        color: white;
        opacity: 0;

        position: absolute;
        top: 25px;
        left: 290px;

        ${props => props.isSecondItemVisible && `
          opacity: 1;
          transition-property: opacity;
          transition-duration: 2s;
          transition-timing-function: ease-out;
        `}
      }
    }

    &.third {
      padding-bottom: 250px;

      .title {
        @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
        font-family: Roboto Slab, sans-serif;
        font-size: 40px;
        letter-spacing: 1.5px;
        color: ${oc.gray[7]};

        position: absolute;
        top: 50px;
        right: 330px;
        opacity: 0;

        ${props => props.isThridItemVisible && `
          opacity: 1;
          transition-property: opacity;
          transition-duration: 2s;
          transition-timing-function: ease-out;
        `}
      }
    }
  }

  .itemInner {
    display: flex;
    justify-content: center;
    align-items: center;

    &.first {
      .left {
        padding-top: 170px;
        font-size: 16px;
        letter-spacing: 1px;
        line-height: 1.6;
        color: #79726E;

        .firstBtn {
          display: inline-block;
          position: relative;
          margin-top: 30px;
          font-size: 14px;
          letter-spacing: 1px;
          color: ${oc.pink[7]};

          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    &.second {
      .right {
        padding-left: 20px;
        padding-top: 50px;
        font-size: 16px;
        letter-spacing: 1px;
        line-height: 1.6;
        color: #79726E;
        opacity: 0;

        ${props => props.isSecondItemVisible && `
          opacity: 1;
          transition-property: opacity;
          transition-duration: 2s;
          transition-timing-function: ease-out;
        `}

        .secondBtn {
          display: inline-block;
          position: relative;
          margin-top: 30px;
          font-size: 14px;
          letter-spacing: 1px;
          color: ${oc.pink[7]};

          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    &.third {
      .left {
        position: relative;
      }

      .right {
        position: relative;
        padding-left: 20px;
        padding-top: 50px;
        font-size: 16px;
        letter-spacing: 1px;
        line-height: 1.6;
        color: #79726E;
        opacity: 0;

        ${props => props.isThridItemVisible && `
          opacity: 1;
          transition-property: opacity;
          transition-duration: 2s;
          transition-timing-function: ease-out;
        `}

        .secondBtn {
          margin-top: 30px;
          font-size: 14px;
          letter-spacing: 1px;
          color: ${oc.pink[7]};
        }
      }
    }
  }

  .lowerArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 230px;
    transform: translateY(100%);
    transition-property: transform;
    transition-duration: 1.5s;
    transition-timing-function: ease-out;

    ${props => props.isLowerItemVisible && `
      transform: translateY(0%);
    `}

    .left {
      width: 38%;
      position: relative;
      height: 230px;

      .tri1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 230px 0 0 230px;
        border-color: transparent transparent transparent #ffffff;
      }

      .tri2 {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 230px 230px;
        border-color: transparent transparent #ffffff transparent;
      }
    }

    .right {
      width: 40%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .square {
        width: 20%;
        height: 230px;
        background: white;
      }
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

    &.download {
      width: 120px;
      top: 100px;
      left: 1178px;
    }

    &.youtube {
      top: 15px;
      left: 720px;
    }

    &.scroll {
      width: 120px;
      top: 150px;
      left: 479px;
    }
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

    &.download {
      top: 91px;
      left: 1180px;
    }

    &.youtube {
      top: 25px;
      left: 659px;
      border-width: 5px 10px 5px 0;
      border-color: transparent #000000 transparent transparent;
    }

    &.scroll {
      border-width: 5px 0 5px 10px;
      border-color: transparent transparent transparent #000000;
      top: 160px;
      left: 550px;
    }
  }
`;