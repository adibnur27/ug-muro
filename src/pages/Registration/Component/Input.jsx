import React from "react";
import styled from "styled-components";

const Input = ({ name, value, placeholder, onChange, label, type = "text" }) => {
  const cekLabel = (label) => {
    if (label === "username") {
      return (
        <>
          <span style={{ transitionDelay: "0ms" }}>U</span>
          <span style={{ transitionDelay: "50ms" }}>s</span>
          <span style={{ transitionDelay: "100ms" }}>e</span>
          <span style={{ transitionDelay: "150ms" }}>r</span>
          <span style={{ transitionDelay: "200ms" }}>n</span>
          <span style={{ transitionDelay: "250ms" }}>a</span>
          <span style={{ transitionDelay: "300ms" }}>m</span>
          <span style={{ transitionDelay: "350ms" }}>e</span>
        </>
      );
    } else if (label === "npm") {
      return (
        <>
          <span style={{ transitionDelay: "0ms" }}>N</span>
          <span style={{ transitionDelay: "50ms" }}>P</span>
          <span style={{ transitionDelay: "100ms" }}>M</span>
        </>
      );
    } else if (label === "email") {
      return (
        <>
          <span style={{ transitionDelay: "0ms" }}>E</span>
          <span style={{ transitionDelay: "50ms" }}>m</span>
          <span style={{ transitionDelay: "100ms" }}>a</span>
          <span style={{ transitionDelay: "150ms" }}>i</span>
          <span style={{ transitionDelay: "200ms" }}>l</span>
        </>
      );
    }
  };

  // 🔹 Custom handler khusus NPM
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (label === "npm") {
      newValue = newValue.replace(/[^0-9]/g, ""); // hanya angka
    }
    onChange({ target: { name, value: newValue } });
  };

  return (
    <StyledWrapper>
      <div className="form-control">
        <input
          type={type} // tetap text
          required
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete="off"
        />
        <label>{cekLabel(label)}</label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-control {
    position: relative;
    margin: 20px 0 30px;
  }

  .form-control input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px #848484 solid;
    display: block;
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
  }

  .form-control input:focus,
  .form-control input:valid {
    outline: 0;
    border-bottom-color: black;
    shadow: black 1px;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    pointer-events: none;
  }

  .form-control label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #222;
    transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  .form-control input:focus + label span,
  .form-control input:valid + label span {
    color: black;
    transform: translateY(-30px);
  }
`;

export default Input;
