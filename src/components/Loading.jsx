import React from 'react'
import styled from 'styled-components'
import loader from "../assets/loader.gif"

const Loading = () => {
  return (
    <Load>
      <div className="loading">
        <div className="overlayLoad"></div>
        <img src={loader} alt="" />
      </div>
    </Load>
  );
}

const Load = styled.div`
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 90vh;
    overflow: hidden;
    .overlayLoad {
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
    }
    img {
      width: 20rem;
      height: 20rem;
      position: absolute;
      top: 20%;
      left: 20%;
    }
  }
`;
export default Loading