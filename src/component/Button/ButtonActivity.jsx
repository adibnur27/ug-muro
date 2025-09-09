import React from 'react';
import styled from 'styled-components';

const ButtonActivity = ({ onClick, children }) => {
  return (
    <StyledWrapper>
      <button className="btn" onClick={onClick}>
        <span className="btn-text">{children}</span>
        <span className="btn-bg"></span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    position: relative;
    overflow: hidden;
    padding: 0.6em 1.2em;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: #2563eb; /* biru elegan */
    color: #fff;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }

  .btn:active {
    transform: scale(0.97);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  }

  .btn-text {
    position: relative;
    z-index: 2;
  }

  /* efek background gradient saat hover */
  .btn-bg {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, #1e40af, #3b82f6, #1e40af);
    transition: left 0.4s ease;
    z-index: 1;
  }

  .btn:hover .btn-bg {
    left: 0;
  }
`;

export default ButtonActivity;
