import React from 'react';
import styled from 'styled-components';

const ButtonActivity = ({onClick, children}) => {
  return (
    <StyledWrapper>
      <button className="btn rounded" onClick={onClick}>
        <span className="btn-text">{children}</span>
        <span className="btn-bg"></span>
        <span className="btn-top-border"></span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
    font-size: 14px;
    background: transparent;
    border: none;
    border-bottom: 2px solid #000;
    padding: .4em .6em;
    color: #000;
    position: relative;
    cursor: pointer;
    font-weight: 500;
    text-transform: none;
    outline: none;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    /* Text akan berubah setelah background terisi */
    transition: color .2s ease .6s;
    
  }

  .btn-text {
    position: relative;
    z-index: 3;
    display: inline-block;
    /* Pastikan text selalu di atas */
    color: inherit;
    transition: color .5s ease .5s;
  }

  .btn-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0;
    background-color: #000;
    transition: height .4s ease .4s;
    z-index: 1;
  }

  .btn-top-border {
    position: absolute;
    right: 0;
    top: 0;
    height: 2px;
    width: 0;
    background-color: #000;
    transition: width .5s ease;
    z-index: 2;
  }

  .btn:hover {
    color: #ffffff !important;
  }

  .btn:hover .btn-bg {
    height: 100%;
  }

  .btn:hover .btn-top-border {
    width: 100%;
  }

  /* Fallback untuk memastikan text putih saat hover */
  .btn:hover .btn-text {
    color: #ffffff !important;
  }
`;

export default ButtonActivity;