import React from 'react';
import styled from 'styled-components';

const ButtonDetailCardWorkshop = ({onClick}) => {
  return (
    <StyledWrapper>
      <button className="btn" onClick={onClick}>
        See Detail
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
    font-size: 14px;
    background: transparent;
    border-bottom: 1px solid black;
    padding: .2em .3em;
    color: #000;
    position: relative;
    transition: .5s ease;
    cursor: pointer;
  }

  .btn::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    height: 2px;
    width: 0;
    background-color: #000;
    transition: .5s ease;
  }

  .btn:hover {
    color: #f8f8f8;
    transition-delay: .5s;
  }

  .btn:hover::before {
    width: 100%;
  }

  .btn::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    background-color: #000;
    transition: .4s ease;
    z-index: -1;
  }

  .btn:hover::after {
    height: 100%;
    transition-delay: 0.4s;
  }`;

export default ButtonDetailCardWorkshop;
