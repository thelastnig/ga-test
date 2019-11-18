import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';

class Article extends Component {
  state = {
    keyword: '',
    newArticle: '',
    articles: [],
    words: [],
    searchResult: null,
    isSearchResultVisible: false,
  }

  componentWillMount() {
    this.getAllwords();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  hadleSearchChange = (e) => {
    const keyword = e.target.value;
    this.setState({
      keyword: keyword
    });
    let isArrayEmpty = true;
    
    const { words } = this.state;
    let filteredWords = [];

    if (keyword.length < 2) {
      this.setState({
        isSearchResultVisible: false
      })
      return;
    }

    for (let i = 0; i < words.length; i++ ){
      if (words[i].indexOf(keyword) !== -1) {
        filteredWords.push(words[i]);
      }
    }

    const searchResult = filteredWords.map(
      (word, index) => {
        return (
          <div className="searchResult" key={index}>
            <div className="word">{word}</div>
          </div>
        )
    });

    if (searchResult.length > 0) {
      isArrayEmpty = false;
    }

    this.setState({
      searchResult: searchResult,
      isSearchResultVisible: !isArrayEmpty
    });
  }

  handleClickSubmit = () => {    
    const { newArticle } = this.state;

    if (newArticle === null || newArticle === '') {
      alert("Write new question");
      return;
    }

    const apiTarget = 'http://localhost:3001/rscript';
    axios.post(apiTarget, {
        article: newArticle
    })
    .then(response => {
      console.log("----------------------");
      console.log(response);
      this.getAllwords();
      this.setState({
        newArticle: ''
      });
    
    })
    .catch(error => {
      console.log(error);
    });

  }

  handleClickSearch = () => {

  }

  getAllwords = () => {
    const apiTarget = 'http://localhost:3001/rscript';
    axios.get(apiTarget)
    .then(response => {
      this.setState({
        words: response.data.words,
        articles: response.data.articles,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { keyword, newArticle, articles, searchResult, isSearchResultVisible } = this.state;

    // 게시물 출력 작업
    const articleList = articles.map(
      (article, index) => {
        const content = article.content;
        const date = article.date.substring(4, 16);
        return (
          <div className="articleList" key={index}>
            <div className="content">{content}</div>
            <div className="date">{date}</div>
          </div>
        )
    });
    return (
    <Wrapper isSearchResultVisible={isSearchResultVisible}>
      <div className="mainText">Article List</div>
      <div className="searchBarWrapper" >
        <input type="text" className="searchBar" name="keyword" value={keyword} onChange={this.hadleSearchChange}/>
        <button className="search" onClick={this.handleClickSearch} placeholder="Search">Search</button>
      </div>
      <div className="searchResultWrapper">{searchResult}</div>
      <div className="articleListWrapper">{articleList}</div>
      <div className="boardWrapper">
        <div className="add">+ Add your article</div>
        <input type="text" className="articleInput" name="newArticle" value={newArticle} onChange={this.handleChange} />
        <button className="submit" onClick={this.handleClickSubmit}>Submit</button>
      </div>
    </Wrapper>
    );
  }
}

export default Article;

const Wrapper = styled.div`
  min-height: 1000px;
  position: relative;
  z-index: 50px;
  padding-top: 100px;
  padding-bottom: 150px;

  .mainText {
    margin-bottom: 80px;
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 34px;
    letter-spacing: 1.2px;
    color: #306060;

  }

  .searchBarWrapper {
    width: 100%;
    position: relative;

    .searchBar {
      width: 80%;
      height: 40px;
      outline: none;
      padding-left: 10px;
      
      
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 18px;
      color: ${oc.gray[9]};
    }
  }

  .boardWrapper {
    width: 100%;
    
    .add {
      color: #306060;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 1.2px;
      margin-bottom: 15px;

    }

    .articleInput {
      width: 80%;
      height: 40px;
      padding-left: 10px;
      
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 18px;

    }
  }

  .searchResultWrapper {
    position: absolute;
    border-radius: 5px;
    top: 273px;
    left: 0;
    width: 250px;
    padding: 15px;
    background: white;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);

    ${props => !props.isSearchResultVisible && `
      display: none;
    `}  

    .searchResult {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }

  button {
    border: none;
    border-radius: 5px;
    outline: none;
    width: 80px;
    height: 30px;
    color: white;
    letter-spacing: 1.2px;
    background: #306060;
    margin-left: 20px;
    cursor: pointer;

    &.search {
      background: ${oc.gray[6]};
    }

  }

  .articleListWrapper {
    margin-top: 50px;
    margin-bottom: 100px;
  }

  .articleList {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border-bottom: 1px solid #306060;;
  
    .content {
      width: 80%;
        
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      color: ${oc.gray[9]};
    }
  
    .date {
      width: 20%;
      text-align: center;
        
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      color: ${oc.gray[9]};
    }
  }
`;


