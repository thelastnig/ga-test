import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
//import synonyms from 'synonyms';
import tcom from 'thesaurus-com';
import axios from 'axios';
import word2vec from 'word2vec.js';

class Synonym extends Component {
  state = {
    keyword: "",
    swords: [],
    apiKeyword: "",
    apiWords: [],
    sApiKeyword: "",
    sApiWords: [],
    autokeyword: "",
    topics: ["cannabis", "business", "medicine", "travel", "sport", "food", "law", "shopping", "product", "job"],
    topicWithSynonyms: [],
    searchResult: null,
    isSearchResultVisible: false,

    trainedKeyword: "",
    trainedWords: [],
    text8Words: [],
    mergedWords: [],

    nounKeyword: "",
    cWords: [],
    nWords: [],
    tWords: [],

    rKeyword: "",
    rWords: [],
    rRawWords: [],
    rStemWords: [],

    topics: [],
    topicSetence: "",
    topic: "",

    newsKeyword: "",
    newsWords: [],
    newsNJWords: [],
    newsNNWords: [],

    newsMKeyword: "",
    newsMWords: [],
    newsNMWords: [],
    newsNCMWords: [],

    leaflyKeyword: "",
    leaflyWords: [],
    leaflyMWords: [],
    leaflyMMWords: [],

    leaflyJJKeyword: "",
    leaflyWordsJJ: [],
    leaflyMWordsJJ: [],
    leaflyMMWordsJJ: [],
  }

  componentWillMount() {
    //this.getTopics();
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

  getAPISynonyms = () => {
    const { apiKeyword } = this.state;
    if (apiKeyword === null || apiKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    axios.get('http://thesaurus.altervista.org/thesaurus/v1', {
      params: {
        word: apiKeyword,
        language: 'en_US',
        output: 'json',
        key: 'bHbXkl95E1r3311DbMGt'
      }
    })
    .then(response => {
      const rawData = response.data["response"];    
      
      var apiWords = [];
      rawData.map((list) => {
        const item = list.list.synonyms
        const words = item.split('|');
        words.map((word) => {
          const index = word.indexOf('(');
          if (index != -1) {
            const trimedWord = word.substring(0, index);
            apiWords.push(trimedWord);
          } else {
            apiWords.push(word);
          }
        })
      });

      this.setState({
        apiWords: apiWords
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getSAPISynonyms = () => {
    const { sApiKeyword } = this.state;
    if (sApiKeyword === null || sApiKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    axios.get('http://www.stands4.com/services/v2/syno.php', {
      params: {
        uid: '7421',
        tokenid: 'Ip16osSgvqIL0mhi',
        word: sApiKeyword,
        format: 'json',
      }
    })
    .then(response => {
      const rawData = response.data["result"];    
      
      var sApiWords = new Set();

      // const lists = rawData.filter((list, i) => {
      //   return list.partofspeech === 'noun';
      // })

      rawData.map((list) => {
        const items = list.synonyms.split(',');
        items.map((item) => {
          sApiWords.add(item);
        })
      });

      this.setState({
        sApiWords: [...sApiWords]
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

  getWord2Vec = () => {
    const { trainedKeyword } = this.state;
    if (trainedKeyword === null || trainedKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'trained',
        method: 'post',
        data: {
          keyword: trainedKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        trainedWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'text8',
        method: 'post',
        data: {
          keyword: trainedKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        text8Words: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'merged',
        method: 'post',
        data: {
          keyword: trainedKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        mergedWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getWord2VecNoun = () => {
    const { nounKeyword } = this.state;
    if (nounKeyword === null || nounKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + '101',
        method: 'post',
        data: {
          keyword: nounKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        cWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'newallbud',
        method: 'post',
        data: {
          keyword: nounKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        nWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'totalmerged',
        method: 'post',
        data: {
          keyword: nounKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        tWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getWord2VecReddit = () => {
    const { rKeyword } = this.state;
    if (rKeyword === null || rKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'reddit',
        method: 'post',
        data: {
          keyword: rKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        rWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'redditraw',
        method: 'post',
        data: {
          keyword: rKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        rRawWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'redditstem',
        method: 'post',
        data: {
          keyword: rKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        rStemWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getTopics = () => {

    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'topics',
        method: 'get',
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list, index) => {
        const object = {
            index: index,
            topic: list 
        };
        results.push(object)
      });

      this.setState({
        topics: results
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getTopic = () => {
    const { topicSetence } = this.state;
    if (topicSetence === null || topicSetence === "") {
      alert("문장을 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'topic',
        method: 'post',
        data: {
          keyword: topicSetence
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      this.setState({
        topic: rawData
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getWord2VecNews = () => {
    const { newsKeyword } = this.state;
    if (newsKeyword === null || newsKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'news',
        method: 'post',
        data: {
          keyword: newsKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        newsWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'newsnj',
        method: 'post',
        data: {
          keyword: newsKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        newsNJWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'newsnn',
        method: 'post',
        data: {
          keyword: newsKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        newsNNWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getWord2VecNewsMerge = () => {
    const { newsMKeyword } = this.state;
    if (newsMKeyword === null || newsMKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'newsmerge',
        method: 'post',
        data: {
          keyword: newsMKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        newsMWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'newsnnmerge',
        method: 'post',
        data: {
          keyword: newsMKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        newsNMWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'newsnn101nnmerge',
        method: 'post',
        data: {
          keyword: newsMKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        newsNCMWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  getWord2Vecleafly = () => {
    const { leaflyKeyword } = this.state;
    if (leaflyKeyword === null || leaflyKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'leaflyreview',
        method: 'post',
        data: {
          keyword: leaflyKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        leaflyWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'leaflynews',
        method: 'post',
        data: {
          keyword: leaflyKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        leaflyMWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'leaflymerged',
        method: 'post',
        data: {
          keyword: leaflyKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        leaflyMMWords: results
      });
    })
    .catch(error => {
      console.log(error);
    });

  }

  getWord2VecleaflyJJ = () => {
    const { leaflyJJKeyword } = this.state;
    if (leaflyJJKeyword === null || leaflyJJKeyword === "") {
      alert("단어를 입력해 주세요.");
      return;
    }
    
    var url = 'http://127.0.0.1:5000/';

    axios({
        url: url + 'leaflyreviewjj',
        method: 'post',
        data: {
          keyword: leaflyJJKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        leaflyWordsJJ: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'leaflynewsjj',
        method: 'post',
        data: {
          keyword: leaflyJJKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        leaflyMWordsJJ: results
      });
    })
    .catch(error => {
      console.log(error);
    });

    axios({
        url: url + 'leaflymergedjj',
        method: 'post',
        data: {
          keyword: leaflyJJKeyword
        }
      }
    )
    .then(response => {
      const rawData = response.data;    
      
      var results = [];

      rawData.map((list) => {
        const object = {
            word: list[0],
            dist: list[1] 
        };
        results.push(object)
      });

      this.setState({
        leaflyMMWordsJJ: results
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { 
      keyword, 
      swords, 
      apiKeyword, 
      apiWords, 
      sApiKeyword, 
      sApiWords, 
      autokeyword, 
      searchResult, 
      isSearchResultVisible, 
      trainedKeyword, 
      trainedWords, 
      text8Words, 
      mergedWords,
      nounKeyword,
      cWords,
      nWords,
      tWords,
      rKeyword,
      rWords,
      rRawWords,
      rStemWords,
      topics,
      topicSetence,
      topic,
      newsKeyword,
      newsWords,
      newsNJWords,
      newsNNWords,
      newsMKeyword,
      newsMWords,
      newsNMWords,
      newsNCMWords,
      leaflyKeyword,
      leaflyWords,
      leaflyMWords,
      leaflyMMWords,
      leaflyJJKeyword,
      leaflyWordsJJ,
      leaflyMWordsJJ,
      leaflyMMWordsJJ,
    } = this.state;
  
    const synonymWords = swords.map((word, i) => {
      return (
        <div className="word" key={i}>{word}</div>
      );
    });

    const apiSynonymWords = apiWords.map((word, i) => {
      return (
        <div className="word" key={i}>{word}</div>
      );
    });

    const sApiSynonymWords = sApiWords.map((word, i) => {
      return (
        <div className="word" key={i}>{word}</div>
      );
    });

    const word2vecT = trainedWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vec8 = text8Words.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecM = mergedWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vec101 = cWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecNew = nWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecTotal = tWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecReddit = rWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecRedditRaw = rRawWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecRedditStem = rStemWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecNews = newsWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecNewsNJ = newsNJWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecNewsNN = newsNNWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecNewsM = newsMWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecNewsMN = newsNMWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecNewsNCM = newsNCMWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecLeafly = leaflyWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecMLeafly = leaflyMWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecMMLeafly = leaflyMMWords.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecLeaflyJJ = leaflyWordsJJ.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecMLeaflyJJ = leaflyMWordsJJ.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const word2vecMMLeaflyJJ = leaflyMMWordsJJ.map((object, i) => {
      return (
        <div className="word vec" key={i}>{object.word}</div>
      );
    });

    const Arragnedtopics = topics.map((object, i) => {
      let stringTopics = object.topic
      let subTopics = stringTopics.split(' + ')
      var str = ""
      subTopics.map((item) => {
        let vector = item.split('*')[0];
        let word = item.split('*')[1];
        word = word.substring(1, word.length - 1);
        //str = str + word + '(' + vector + ')' + '    '
        str = str + word  + ' ' + ' / ' + ' ';
      })

      return (
       <div className="word topic" key={i}>{i} : {str}</div>
      );
    });
  
    return (
      <Wrapper isSearchResultVisible={isSearchResultVisible}>
        <div className="innerWrapper">
          <div className="section">
            <div className="textArea">Find Synonyms (thesaurus.com Node library)</div>
            <div className="searchArea">
              <div className="searchLeft"><input type="text" className="inputText" name="keyword" value={keyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getSynonyms}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wordWrapper">{synonymWords}</div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Find Synonyms by API (thesaurus API)</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="apiKeyword" value={apiKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getAPISynonyms}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wordWrapper">{apiSynonymWords}</div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Find Synonyms by API (Synonyms API)</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="sApiKeyword" value={sApiKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getSAPISynonyms}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wordWrapper">{sApiSynonymWords}</div>
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

          <div className="section">
            <div className="textArea">Trained By allBudReview</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="trainedKeyword" value={trainedKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getWord2Vec}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wrapperflex">
                <div className="wordWrapper vec">Trained by AllBudReview(A){word2vecT}</div>
                <div className="wordWrapper vec">Imported Model(B){word2vec8}</div>
                <div className="wordWrapper vec"><strong>Merged Model(A + B)</strong>{word2vecM}</div>
              </div>
            </div>
          </div>          

          <div className="section">
            <div className="textArea">Only Noun</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="nounKeyword" value={nounKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getWord2VecNoun}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wrapperflex">
                <div className="wordWrapper vec">Trained by cannabis101(A){word2vec101}</div>
                <div className="wordWrapper vec">Trained by allBudReview(B){word2vecNew}</div>
                <div className="wordWrapper vec"><strong>total Merged Model(A + B + text8)</strong>{word2vecTotal}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Cannabis sections from Reddit</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="rKeyword" value={rKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getWord2VecReddit}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wrapperflex">
                <div className="wordWrapper vec">Only nouns{word2vecReddit}</div>
                <div className="wordWrapper vec">Raw texts{word2vecRedditRaw}</div>
                <div className="wordWrapper vec">Stemmed texts{word2vecRedditStem}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Topic List (from Reddit Model)</div>
            <div className="searchArea topics">
              <div><button className="btnSearch topics" onClick={this.getTopics}>Show Topics</button></div>
            </div>
            <div className="resultArea">
              <div className="wordWrapper">{Arragnedtopics}</div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Find Topic (from Reddit Model)</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="topicSetence" value={topicSetence} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getTopic}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wordWrapper"><div className="findTopic"><span>{topic}</span></div></div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Model from mjbizdaily.com</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="newsKeyword" value={newsKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getWord2VecNews}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wrapperflex">
                <div className="wordWrapper vec">Raw texts{word2vecNews}</div>
                <div className="wordWrapper vec">Noun and Adjective{word2vecNewsNJ}</div>
                <div className="wordWrapper vec">Noun{word2vecNewsNN}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">Merged Model from mjbizdaily.com</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="newsMKeyword" value={newsMKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getWord2VecNewsMerge}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wrapperflex">
                <div className="wordWrapper vec">Text8 + News {word2vecNewsM}</div>
                <div className="wordWrapper vec">Text8 + News(Noun){word2vecNewsMN}</div>
                <div className="wordWrapper vec">Text8 + News(N) + Cannabis101(N){word2vecNewsNCM}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">From Leafly</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="leaflyKeyword" value={leaflyKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getWord2Vecleafly}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wrapperflex">
                <div className="wordWrapper vec">Leafly Review(Noun){word2vecLeafly}</div>
                <div className="wordWrapper vec">Leafly News(Noun){word2vecMLeafly}</div>
                <div className="wordWrapper vec">Text8 + Leafly Review/News(Noun){word2vecMMLeafly}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="textArea">From Leafly</div>
            <div className="searchArea auto">
              <div className="searchLeft"><input type="text" className="inputText" name="leaflyJJKeyword" value={leaflyJJKeyword} onChange={this.handleChange}/></div>
              <div className="searchRight"><button className="btnSearch" onClick={this.getWord2VecleaflyJJ}>Search</button></div>
            </div>
            <div className="resultArea">
              <div className="wrapperflex">
                <div className="wordWrapper vec">Leafly Review(Noun + Abjective){word2vecLeaflyJJ}</div>
                <div className="wordWrapper vec">Leafly News(Noun + Abjective){word2vecMLeaflyJJ}</div>
                <div className="wordWrapper vec">Text8 + Leafly Review/News(N + A){word2vecMMLeaflyJJ}</div>
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

    &.topics {
      display: block;
    }

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

      &.topics {
        width: 250px;
      }
    }
  }

  .fixed {
    position: relative;
  }

  .resultArea{
    width: 100%;
    margin-top: 20px;

    .wrapperflex {
      display: flex;
      justify-content: space-between;

    }

    .wordWrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      &.vec {
        flex-direction: column;
        width: 30%;
      }

      &.topic {
        flex-direction: column;
        width: 100%;
      }

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

        &.findTopic{
          padding: 0;
          background: transparent;
          color: black;
          font-weight: 600;
          font-size: 16px;
        }

        &.topic {
          background: ${oc.gray[8]};
        }
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