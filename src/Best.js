import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import axios from 'axios';

class Best extends Component {
  render() {
    return (
      <Wrapper>
        <div className="listWrapper">
          Best List Test
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
  
`;
