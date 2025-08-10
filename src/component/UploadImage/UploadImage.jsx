import React, { useState } from "react";
import styled from "styled-components";

const UploadImage = ({ name, onChange, defaultPreview }) => {
  const [preview, setPreview] = useState(defaultPreview || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <StyledWrapper>
      <label className="custum-file-upload" htmlFor={name}>
        {preview ? (
          <img src={preview} alt="Preview" className="preview-image" />
        ) : (
          <>
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 1C9.73 1 9.48 1.11 9.29 1.29L3.29 7.29C3.11 7.48 3 7.73 3 8v12c0 1.66 1.34 3 3 3h1c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1-.45-1-1V9h5c.55 0 1-.45 1-1V3h7c.55 0 1 .45 1 1v5c0 .55.45 1 1 1s1-.45 1-1V4c0-1.66-1.34-3-3-3h-8z" />
              </svg>
            </div>
            <div className="text">
              <span>Click to upload image</span>
            </div>
          </>
        )}
        <input type="file" id={name} accept="image/*" onChange={handleFileChange} />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .custum-file-upload {
    height: 200px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border: 2px dashed #cacaca;
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0px 48px 35px -48px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .icon svg {
    height: 80px;
    fill: rgba(75, 85, 99, 1);
  }

  .text span {
    font-weight: 400;
    color: rgba(75, 85, 99, 1);
  }

  input {
    display: none;
  }

  .preview-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

export default UploadImage;
