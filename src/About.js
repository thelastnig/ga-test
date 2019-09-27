import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import oc from 'open-color';
import gandy2 from './image/gandy2.jpg'
import gandy5 from './image/gandy5.jpg'

class About extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Wrapper>
        <div className="image">
          <img src={gandy2} alt={gandy2}/>
        </div>
        <div className="text">
          David James Gandy (born 19 February 1980) is a British model who began his career after winning a televised model-search competition. For several years, Gandy was the lead male model for Italian designers Dolce and Gabbana who featured him in their campaigns and fashion shows.
          <br/><br/>In an industry dominated by skinny models, Gandy's muscular build caused some menswear fashion designers change standards.
          The increase in his popularity and name recognition resulted in a broad portfolio of magazine covers, editorial photo shoots, interviews and industry awards. 
          He has gone on to participate in fashion-related and personal projects such as writing a blog for British Vogue, writing car reviews for British GQ, mobile app development and charity work.
        </div>
        <div className="title">Background</div>
        <div className="text">
          In his youth, Gandy wanted to be a veterinarian but his grades were not high enough to meet the needed standards for that line of study. 
          So, while studying multimedia computing, he went to work for Auto Express, delivering the latest Porsches and Jaguars to the track for testing.
          Before graduating from the University of Gloucestershire with a Marketing degree, Gandy's flatmate entered him (without his knowledge) into a modelling competition on ITV’s This Morning hosted by Richard and Judy.
          The 21-year-old Gandy won the competition which included a contract with Select Model Management in London.
        </div>
        <div className="title">Work</div>
        <div className="text last">
          During the early years of his career, Gandy modelled for a variety of companies including: Shiatzy Chen, 7 for all Mankind, Zara, Gant U.S.A., Hugo Boss, Russell and Bromley, H and M, Carolina Herrera, Massimo Dutti and others.
          In 2006, he became the face of Dolce and Gabbana, annually starring in their apparel campaigns and fashion shows through 2011, working with female supermodels such as Gemma Ward, Scarlett Johansson and Naomi Campbell as well as male models including Noah Mills, Tony Ward and Adam Senn.<br/><br/>
          Gandy is best known for the 2007 advert of Dolce and Gabbana's fragrance "Light Blue" with Marija Vujovic (shot by photographer Mario Testino) which had 11 million online hits and saw a 50-foot billboard of him displayed in Times Square.He modelled for their 2008 calendar, shot by photographer, Mariano Vivanco.
          Gandy returned as the face of the second "Light Blue" fragrance campaign for 2010, but this time with Anna Jagodzinska. He also made a short promotional film for W Hotels with Helena Christensen called "Away We Stay".<br/><br/>
          In 2011, the fashion house published "David Gandy by Dolce and Gabbana", a 280-page photographic coffee table book of images chronicling their years of collaboration. That same year, Gandy shot four magazine covers and five fashion editorial photoshoots. 
          In 2012, he was featured on sixteen magazine covers, eighteen fashion editorials and modelled for Banana Republic, Lucky Brand Jeans, El Palacio de Hierro and Marks and Spencer. 
          In addition, Gandy was named the brand ambassador for Johnnie Walker Blue Label.<br/><br/>
          In 2013, Dolce and Gabbana released the third version of the "Light Blue" fragrance campaign featuring Gandy. Once again, Mario Testino filmed the adverts and commercial on location in the island of Capri, southern Italy but this time with the Italian model Bianca Balti in the female role.
          Bionda Castana, a British shoe label, released a fashion film featuring Gandy called "David Gandy's Goodnight." In it, he seduces several women who discover later that he has stolen their shoes.
          On 26 September, Gandy and Jaguar released a short film called "Escapism" which featured Gandy driving models such as the C-Type, E-Type, XKSS as well as the new F-Type.
          In November, Marks and Spencer launched their 2013 Christmas advertising campaign, "Magic and Sparkle". The fairy-tale-themed commercial featured Rosie Huntington-Whiteley with Helena Bonham Carter and Gandy.
        </div> 
        <div className="back"><Link to="/" className="styledLink">&larr;&nbsp;BACK</Link></div>
        <div className="campaign">
          <a href="/campaign?utm_source=site&utm_medium=link&utm_campaign=promotion">
            <img src={gandy5} alt={gandy5}/>
          </a>
          <div className="upperText">
            Meet the be<span>st model</span>
          </div>
          <div className="lowerText">
            <span>in</span> the world
          </div>
          <div className="tooltipTriangle"/>
          <div className="tooltip">Campaign</div>
        </div>
      </Wrapper>
    );
  }
}

export default About;


const Wrapper = styled.div`
  .image {
    text-align: center;
    padding-top: 30px;
    margin-bottom: 50px;
  }

  .title {
    padding: 100px 0 50px 0;
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 40px;
    letter-spacing: 1.5px;
    color: ${oc.gray[7]};
  }

  .text {
    letter-spacing: 1px;
    line-height: 1.6;
    color: #79726E;

    &.last {
    }
  }

  .styledLink {
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 1px;
    color: ${oc.pink[7]};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .back {
    position: relative;
    z-index: 2;
    margin-top: 50px;
  }
  
  .campaign {
    position: relative;
    z-index: 2;
    margin: 0 auto;
    margin-top: 100px;
    padding-bottom: 100px;
    text-align: center;
  }
  
  .upperText {
    position: absolute;
    top: 40px;
    left: 150px;
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 24px;
    letter-spacing: 1px;
    color: ${oc.gray[9]};

    span {
      color: white;
    }
  }
  
  .lowerText {
    position: absolute;
    top: 150px;
    right: 170px;
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 24px;
    letter-spacing: 1px;
    color: ${oc.gray[9]};

    span {
      color: white;
    }
  }
  
  .tooltip {
    position: absolute;
    width: 100px;
    top: -63px;
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
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 5px 0 5px;
    border-color: #000000 transparent transparent transparent;
  }
`;