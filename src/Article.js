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
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClickSubmit = () => {    // 카테고리 받아오기
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
    })
    .catch(error => {
      console.log(error);
    });

  }

  handleClickSearch = () => {
    this.getAllwords();
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
    const { keyword, newArticle, articles } = this.state;
    return (
    <Wrapper>
      <div className="searchBarWrapper">
        <input type="text" className="searchBar" />
        <button className="search" onClick={this.handleClickSearch}>Search</button>
      </div>
      <div className="boardWrapper">
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
  padding-top: 50px;

  border: 1px solid red;

  .searchBarWrapper {
    width: 100%;

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
    
    .articleInput {
      width: 80%;
      height: 40px;

    }
  }
`;