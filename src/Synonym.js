import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
//import synonyms from 'synonyms';
import tcom from 'thesaurus-com';


class Synonym extends Component {
  state = {
    keyword: "",
    swords: [],
    autokeyword: "",
    topics: ["cannabis", "business", "medicine", "travel", "sport", "food", "law", "shop", "product", "job"],
    topicWithSynonyms: [],
    searchResult: null,
    isSearchResultVisible: false,
  }

  componentWillMount() {
    this.getTopics();
  }

  getSynonyms = () => {
    const { keyword } = this.state;
    if (keyword === null || keyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    //const swords = synonyms(keyword, "n");
    const swords = tcom.search(keyword);
    this.setState({
      swords: swords["synonyms"]
    })
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    })
  }

  handleAutoChange = (e) => {
    const autokeyword = e.target.value;
    this.setState({
      autokeyword: autokeyword
    });

    if (autokeyword.length < 2) {
      this.setState({
        isSearchResultVisible: false
      })
      return;
    }

    const { topicWithSynonyms } = this.state;
    let selectedSetTopic = new Set();
    let isArrayEmpty = true;

    topicWithSynonyms.forEach((topic) => {
      for (let key in topic) {
        const list = topic[key]
        list.forEach((word) => {
          if (word.indexOf(autokeyword) !== -1) {
            selectedSetTopic.add(key);
          }
        });
      }
    });

    const selectedTopic = [...selectedSetTopic];

    const searchResult = selectedTopic.map(
      (word, index) => {
        return (
          <div className="searchResult" key={index}>{word}</div>
        )
    });

    if (searchResult.length > 0) {
      isArrayEmpty = false;
    }

    if (selectedTopic.length > 0) {
      isArrayEmpty = false;
    }

    this.setState({
      searchResult: searchResult,
      isSearchResultVisible: !isArrayEmpty
    });

  }

  getTopics = () => {
    const { topics } = this.state;
    var topicWithSynonyms = [];
    topics.forEach((value, index) => {
      const swords = tcom.search(value);
      topicWithSynonyms.push({
        [value]: swords["synonyms"].concat([value])
      });
    })
    this.setState({
      topicWithSynonyms: topicWithSynonyms
    });
    //console.log(topicWithSynonyms);
  }

  render() {
    const { keyword, swords, autokeyword, searchResult, isSearchResultVisible} = this.state;
  
    const synonymWords = swords.map((word, i) => {
      return (
        <div className="word" key={i}>{word}</div>
      );
    });
  
    return (
      <Wrapper isSearchResultVisible={isSearchResultVisible}>
        <div className="innerWrapper">
          <div className="section">
            <div className="textArea">Find Synonyms</div>
            <div className="searchArea">
              <div className="searchLeft"><input type="text" className="inputText" name="keyword" value={keyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getSynonyms}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wordWrapper">{synonymWords}</div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Autocomplete by synonym</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="autokeyword" value={autokeyword} onChange={this.handleAutoChange}/></div>
              <div className="searchRight"><button className="btnSearch" >Search</button></div>
            </div>
            <div className="fixed">           
              <div className="resultArea auto">
                {searchResult}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Synonym;

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
    margin-bottom: 200px;
  }

  .textArea {
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #306060;

    margin-bottom: 15px;
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

    .inputText {
      @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
      font-family: Roboto Slab, sans-serif;
      font-size: 18px;
      width: 100%;
      height: 35px;

      padding-left: 10px;
    }

    .btnSearch {

      width: 90px;
      height: 35px;

      border: none;
      outline: none;
      border-radius: 5px;

      cursor: pointer;
      color: white;
      background: #306060;
      letter-spacing: 1.2px;
    }
  }

  .fixed {
    position: relative;
  }

  .resultArea{
    width: 100%;
    margin-top: 20px;

    .wordWrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      div {
        padding: 10px 15px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 10px;

        font-size: 14px;
        color: white;
        letter-spacing: 1.2px;
        border-radius: 7px;
        background: ${oc.gray[6]};
      }
    }

    &.auto {
      position: absolute;
      border-radius: 5px;
      top: -10px;
      left: 0;
      width: 250px;
      padding: 15px;
      background: white;
      box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);

      ${props => !props.isSearchResultVisible && `
        display: none;
      `}  
    }
  }

  .searchResult {
    padding-top: 10px;
    padding-bottom: 10px;

    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    font-family: Roboto Slab, sans-serif;
  }

}
`;