import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';

class Best extends Component {
  state = {
    keywords: [],
    bestCook: [],
    bestBullpen: [],
    bestIlbe: [],
    bestInstiz: [],
    bestRuliweb: [],
    bestClien: [],
    bestNamu: [],
  }

  componentWillMount() {
    this.getKeywords();
    this.getBestCooks();
    this.getBestBullpens();
    this.getBestIlbes();
    this.getBestInstizs();
    this.getBestRuliwebs();
    this.getBestCliens();
    this.getBestNamus();
  }

  getKeywords = () => {
    const apiTarget = 'http://localhost:3001/best/naverKeyword';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        keywords: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getBestCooks = () => {
    const apiTarget = 'http://localhost:3001/best/82cook';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        bestCook: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getBestBullpens = () => {
    const apiTarget = 'http://localhost:3001/best/bullpen';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        bestBullpen: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getBestIlbes = () => {
    const apiTarget = 'http://localhost:3001/best/ilbe';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        bestIlbe: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getBestInstizs = () => {
    const apiTarget = 'http://localhost:3001/best/instiz';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        bestInstiz: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getBestRuliwebs = () => {
    const apiTarget = 'http://localhost:3001/best/ruliweb';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        bestRuliweb: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getBestCliens = () => {
    const apiTarget = 'http://localhost:3001/best/clien';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        bestClien: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getBestNamus = () => {
    const apiTarget = 'http://localhost:3001/best/namu';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        bestNamu: response.data.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
  
    const { keywords, bestCook, bestBullpen, bestIlbe, bestInstiz, bestRuliweb, bestClien, bestNamu } = this.state;

    // 네이버 실시간 검색어 출력 작업
    const naverKeywords = keywords.map(
      (keyword, index) => {
        const rank = keyword.num;
        const word = keyword.title
        return (
          <div className="keyword" key={index}>
            <span className="rank">{rank}</span>
            <span className="word">{word}</span>
          </div>
        )
    });

    // 82cook 게시물 출력 작업
    const cookArticles = bestCook.map(
      (article, index) => {
        const link = "https://www.82cook.com" + article.link;
        const title = article.title
        return (
          <div className="cookArticle" key={index}>
            <a href={link}>{title}</a>
          </div>
        )
    });

    // Bullpen 게시물 출력 작업
    const bullpenArticles = bestBullpen.map(
      (article, index) => {
        const link =  article.link;
        const title = article.title
        return (
          <div className="bullpenArticles" key={index}>
            <a href={link}>{title}</a>
          </div>
        )
    });

    // Ilbe 게시물 출력 작업
    const ilbeArticles = bestIlbe.map(
      (article, index) => {
        const link =  "https://www.ilbe.com" + article.link;
        const title = article.title
        return (
          <div className="ilbeArticles" key={index}>
            <a href={link}>{title}</a>
          </div>
        )
    });

    // Instiz 게시물 출력 작업
    const instizArticles = bestInstiz.map(
      (article, index) => {
        const link =  "https://www.instiz.net/" + article.link;
        const title = article.title
        return (
          <div className="instizArticles" key={index}>
            <a href={link}>{title}</a>
          </div>
        )
    });

    // Ruliweb 게시물 출력 작업
    const ruliwebArticles = bestRuliweb.map(
      (article, index) => {
        if (index > 11) return;
        const link =  article.link;
        const title = article.title
        return (
          <div className="ruliwebArticles" key={index}>
            <a href={link}>{title}</a>
          </div>
        )
    });

    // Clien 게시물 출력 작업
    const clienArticles = bestClien.map(
      (article, index) => {
        if (index > 11) return;
        const link =  "https://www.clien.net" + article.link;
        const title = article.title
        return (
          <div className="clienArticles" key={index}>
            <a href={link}>{title}</a>
          </div>
        )
    });

    // Namuwiki 게시물 출력 작업
    const namuArticles = bestNamu.map(
      (article, index) => {
        const link =  "https://namu.live" + article.link;
        const title = article.title
        return (
          <div className="namuArticles" key={index}>
            <a href={link}>{title}</a>
          </div>
        )
    });

    
    return (
      <Wrapper>
        <div className="listWrapper">
          <div className="section">
            <p>Naver 실시간 검색어</p>
            {naverKeywords}
          </div>
          <div className="section">
            <p>82cook</p>
            {cookArticles}
          </div>
          <div className="section">
            <p>Bullpen</p>
            {bullpenArticles}
          </div>
          <div className="section">
            <p>Ilbe</p>
            {ilbeArticles}
          </div>
          <div className="section">
            <p>Instiz</p>
            {instizArticles}
          </div>
          <div className="section">
            <p>Ruliweb</p>
            {ruliwebArticles}
          </div>
          <div className="section">
            <p>Clien</p>
            {clienArticles}
          </div>
          <div className="section">
            <p>Namu Wiki</p>
            {namuArticles}
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Best;

const Wrapper = styled.div`
  min-height: 1000px;
  position: relative;
  z-index: 50px;
  padding-top: 100px;
  padding-bottom: 150px;

  .listWrapper {
    width: 100%;
    height: 100%;
    border: 1px solid ${oc.gray[5]};
  }

  .section {
    padding: 20px;
    border-bottom: 1px solid ${oc.gray[7]};
  }

  .keyword {
  }
  
  .cookArticle {
  }

  .bullpenArticles {

  }
`;
