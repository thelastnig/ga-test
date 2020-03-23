import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';

// for spinner
import { css } from "@emotion/core";
// First way to import
import { ClipLoader } from "react-spinners";

class TopicModel extends Component {
  state = {
    // for spinner
    loading: false,

    article: "",
    mainTopics: [],
    mainTopicsT: [],
    mainTopicsTA: [],
    isMainTopicVisible: false,
    topics: [],
    topicsT: [],
    topicsTA: [],
    isSuccess: false,
    isSearchResultVisible: false,

    // Auto Completion
    autoKeyword: "",
    autoKeywordResult: "",
    isAutoKeywordResultVisible: false,
  }

  componentWillMount() {

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleAutoChange = (e) => {
    const article = e.target.value;
    this.setState({
      article: article
    });

    if (article.length < 700) {
      this.setState({
        isSearchResultVisible: false
      })
      return;
    }

    this.getTopic(article);
  }

  getTopics = () => {
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'topics',
        method: 'get'
      }
    )
    .then(response => {
      const rawData = response.data; 
      console.log(rawData)   

      this.setState({
        mainTopics: rawData,
        isMainTopicVisible: true
      });
    })
    .catch(error => {
      console.log(error);
    });
    

    axios({
        url: url + 'topicst',
        method: 'get'
      }
    )
    .then(response => {
      const rawData = response.data; 
      console.log(rawData)   

      this.setState({
        mainTopicsT: rawData,
        isMainTopicVisible: true
      });
    })
    .catch(error => {
      console.log(error);
    });
    
    axios({
        url: url + 'topicsta',
        method: 'get'
      }
    )
    .then(response => {
      const rawData = response.data; 
      console.log(rawData)   

      this.setState({
        mainTopicsTA: rawData,
        isMainTopicVisible: true
      });
    })
    .catch(error => {
      console.log(error);
    });

  }

  getTopic = (article) => {
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'topic',
        method: 'post',
        data: {
          article: article
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      var isSuccess = false;

      if (rawData['state'] == 'success') {
        isSuccess = true;
      } 

      this.setState({
        topics: rawData['data'],
        isSuccess: isSuccess,
        isSearchResultVisible: true
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'topict',
        method: 'post',
        data: {
          article: article
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      var isSuccess = false;

      if (rawData['state'] == 'success') {
        isSuccess = true;
      } 

      this.setState({
        topicsT: rawData['data'],
        isSuccess: isSuccess,
        isSearchResultVisible: true
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'topicta',
        method: 'post',
        data: {
          article: article
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      var isSuccess = false;

      if (rawData['state'] == 'success') {
        isSuccess = true;
      } 

      this.setState({
        topicsTA: rawData['data'],
        isSuccess: isSuccess,
        isSearchResultVisible: true
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getAutoKeyword = () => {

    const { autoKeyword } = this.state

    if (autoKeyword === "" || autoKeyword === null || autoKeyword.length < 10) {

      this.setState({
        isAutoKeywordResultVisible: false
      })
      return
    }

    var url = 'http://127.0.0.1:5000/';

    this.setState({
      loading: true
    })

    axios({
        url: url + 'autokeyword',
        method: 'post',
        data: {
          autoKeyword: autoKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      var isSuccess = false;

      if (rawData['state'] == 'success') {
        isSuccess = true;
      } 

      this.setState({
        autoKeywordResult: rawData['result'],
        isSuccess: isSuccess,
        isAutoKeywordResultVisible: true,
        loading: false,
      });
    })
    .catch(error => {
      console.log(error);
      this.setState({
        loading: false,
      })
    });

  }

  render() {
    const {
      loading,

      article,
      topics,
      topicsT,
      topicsTA,
      isSearchResultVisible,
      mainTopics,
      mainTopicsT,
      mainTopicsTA,
      isMainTopicVisible,

      autoKeyword,
      autoKeywordResult,
      isAutoKeywordResultVisible,
    } = this.state;

    let articleLength = article.length
  
    const synonymWords = topics.map((word, i) => {
      return (
        <div className="word" key={i}>{word}</div>
      );
    });
  
    const synonymWordsT = topicsT.map((word, i) => {
      return (
        <div className="word" key={i}>{word}</div>
      );
    });
  
    const synonymWordsTA = topicsTA.map((word, i) => {
      return (
        <div className="word" key={i}>{word}</div>
      );
    });

    const categories = mainTopics.map((topic, i) => {
      var rawTags = topic['tags'];
      
      const tags = rawTags.map((tag, i) => {
        return <div key={i} className="categoryTag">{tag}</div>
      })

      var rawTopics = topic['topics'].split('+');
      
      const topics = rawTopics.map((topic, i) => {
        const splitedTopic = topic.split('*');
        return <div key={i} className="categoryTopic">{splitedTopic[1].replace(/"/gi, '').trim()}<span className="score">({splitedTopic[0].trim()})</span></div>
      })

      return (
        <div className="categoryItem" key={i}>
          <div className="categoryTitle">Category {topic['idx']}</div>
          <div className="categoryTags">{tags}</div>
          <div className="categoryTopics">{topics}</div>
        </div>
      )
    })

    const categoriesT = mainTopicsT.map((topic, i) => {
      var rawTags = topic['tags'];
      
      const tags = rawTags.map((tag, i) => {
        return <div key={i} className="categoryTag">{tag}</div>
      })

      var rawTopics = topic['topics'].split('+');
      
      const topics = rawTopics.map((topic, i) => {
        const splitedTopic = topic.split('*');
        return <div key={i} className="categoryTopic">{splitedTopic[1].replace(/"/gi, '').trim()}<span className="score">({splitedTopic[0].trim()})</span></div>
      })

      return (
        <div className="categoryItem" key={i}>
          <div className="categoryTitle">Category {topic['idx']}</div>
          <div className="categoryTags">{tags}</div>
          <div className="categoryTopics">{topics}</div>
        </div>
      )
    })

    const categoriesTA = mainTopicsTA.map((topic, i) => {
      var rawTags = topic['tags'];
      
      const tags = rawTags.map((tag, i) => {
        return <div key={i} className="categoryTag">{tag}</div>
      })

      var rawTopics = topic['topics'].split('+');
      
      const topics = rawTopics.map((topic, i) => {
        const splitedTopic = topic.split('*');
        return <div key={i} className="categoryTopic">{splitedTopic[1].replace(/"/gi, '').trim()}<span className="score">({splitedTopic[0].trim()})</span></div>
      })

      return (
        <div className="categoryItem" key={i}>
          <div className="categoryTitle">Category {topic['idx']}</div>
          <div className="categoryTags">{tags}</div>
          <div className="categoryTopics">{topics}</div>
        </div>
      )
    })

    // for spinner
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: #306060;
    `;

    return (
      <Wrapper 
        isSearchResultVisible={isSearchResultVisible} 
        isMainTopicVisible={isMainTopicVisible} 
        isAutoKeywordResultVisible={isAutoKeywordResultVisible} >
        <div className="innerWrapper">

          <div className="section">
            <div className="textArea">- Topics<button className="btnSearch" onClick={this.getTopics}>Show</button></div>
            <div className="categoryResultArea">
              <div className="wordWrapper">
                <div className="categoryWrapper">
                  <div className="categorySource">Leafly(adjusted)</div>
                  {categories}
                </div>
                <div className="categoryWrapper">
                  <div className="categorySource">Total</div>
                  {categoriesT}
                </div>
                <div className="categoryWrapper">
                  <div className="categorySource">Total(adjusted)</div>
                  {categoriesTA}
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="textArea"><span className="signal">●</span> Topic Modeling for Article - 700 Minimum length  <span className="length">(length: <span className="metric">{articleLength}</span>)</span></div>
            <div className="searchArea">
              <textarea className="inputText" name="article" value={article} onChange={this.handleAutoChange}></textarea>
            </div>
            <div className="resultArea">
              <div className="info">Topic Recommandation</div>
              <div className="wordWrapper">
                <p>Leafly(adjusted)</p>
                <div className="categorySource">
                  {synonymWords}
                </div>
              </div>
              <div className="wordWrapper">
                <p>Total</p>
                <div className="categorySource">
                  {synonymWordsT}
                </div>
              </div>
              <div className="wordWrapper">
                <p>Total(adjusted)</p>
                <div className="categorySource">
                  {synonymWordsTA}
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Auto Completion</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputAuto" name="autoKeyword" value={autoKeyword} onChange={this.handleChange}/></div>              
              <div className="searchRight"><button className="btnSearch" onClick={this.getAutoKeyword}>Search</button></div>
            </div>
            <div className="resultAreaAuto">
              <div className="spinner">
                <ClipLoader
                  css={override}
                  size={35}
                  color={"#306060"}
                  loading={this.state.loading}
                />
              </div>
              <div className="wordWrapper">{autoKeywordResult}</div>
            </div>
          </div>

        </div>
      </Wrapper>
    );
  }
}

export default TopicModel;

const Wrapper = styled.div`
  min-height: 1000px;
  width: 100%;
  position: relative;
  z-index: 50px;
  padding-top: 100px;
  padding-bottom: 150px;
  
  .innerWrapper {
    width: 80%;
    margin: 0 auto;
  }

  .section {
    margin-bottom: 100px;
  }
  

  .searchArea {
    display: flex;
    align-items: center;
    justify-content: center;

    .searchLeft {
      width: 85%;
    }

    .searchRight {
      width: 15%;
      text-align: center;
    }
  }

  .textArea {
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #306060;

    margin-bottom: 15px;

    .signal {
      font-size: 28px;
      color: #c92a2a;

      ${props => props.isSearchResultVisible &&`
        color: #306060;
      `}
    }

    .length {
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 14px;
      font-weight: 500;
    }

    .metric {      
      font-size: 14px;
      font-weight: 600;
    }
  }

  .inputText {
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 18px;
    width: 100%;
    height: 500px;

    padding-left: 10px;
  }

  .inputAuto {
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 18px;
    width: 100%;
    height: 35px;

    padding-left: 10px;
  }

  .categoryResultArea {

    width: 100%;
    display: none;
    
    ${props => props.isMainTopicVisible && `
      display: block;
    `}

    .wordWrapper {
      display: flex;
      width: 100%;
      justify-content: flex-start;
    }

    .categoryWrapper {
      width: 33%;
    }

    .categoryItem {
      padding-top: 5px;
      padding-bottom: 15px;
    }

    .categorySource {
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 20px;
      color: black;
      padding-bottom: 20px;
    }

    .categoryTitle {
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 18px;
      color: ${oc.gray[7]};

    }
    
    .categoryTags, .categoryTopics {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .categoryTag {
      padding: 8px 12px;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-right: 10px;    
      
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;

      font-size: 14px;
      color: white;
      letter-spacing: 1.2px;
      border-radius: 7px;
      background: ${oc.gray[6]};
    }

    .categoryTopic {
      padding: 5px 7px;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-right: 5px;    
      
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;

      font-size: 13px;
      color: #306060;
      border-radius: 5px;
      border: 1px solid #306060;

      span {
        font-size: 11px;
      }
    }
  }

  .resultArea {
    width: 100%;
    margin-top: 20px;
    display: none;
    
    ${props => props.isSearchResultVisible && `
      display: block;
    `} 

    .info {
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 18px;
      font-weight: 600;
      color: #306060;
      padding-bottom: 10px;

    }

    .wordWrapper {
      
      p {
        @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
        font-family: Roboto Slab, sans-serif;
        font-size: 16px;
        color: black;
      }

      .categorySource {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .word {
        padding: 10px 15px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 10px;    
        
        @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
        font-family: Roboto Slab, sans-serif;

        font-size: 14px;
        color: white;
        letter-spacing: 1.2px;
        border-radius: 7px;
        background: ${oc.gray[6]};
      }
    }
  }

  .btnSearch {

    width: 90px;
    height: 30px;
    margin-left: 50px;

    border: none;
    outline: none;
    border-radius: 5px;

    cursor: pointer;
    color: white;
    background: #306060;
    letter-spacing: 1.2px;
  }

  .resultAreaAuto {

    width: 100%;
    position: relative;

    .spinner {
      margin-top: 20px;
    }

    .wordWrapper {
      display: none;
    
      ${props => props.isAutoKeywordResultVisible && `
        display: block;
      `} 
    
      ${props => !props.isAutoKeywordResultVisible && `
        display: none;
      `} 

      position: absolute;
      top: 5px;
      left: 0px;
      width: 50%;
      border-radius: 10px;
      background: white;
      padding: 20px 10px;
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);

      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 16px;
      color: black;
    }
  }
`;