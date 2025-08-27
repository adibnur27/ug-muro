import React from "react";
import styled from "styled-components";

const WhatsAppButton = () => {
  return (
    <StyledWrapper>
      <button>
        <a href="https://wa.me/6289652101870?text=Halo%20Admin%20Pusat%20Studi%20Multimedia%20dan%20Robotika%20Universitas%20Gunadarma.%20Saya%20ingin%20mengajukan%20bantuan%20atau%20aduan%20terkait%20program%20Workshop."  target="_blank" rel="noopener noreferrer">
          <p className="font-roboto">Hubungi Kami</p>
          <span className="font-roboto">
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-whatsapp icon-shere" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
            </svg>
            Message
          </span>
        </a>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    color: rgba(37, 211, 102, 1);
    background-color: white;
    padding: 0.5em 4em;
    border: 2px solid rgba(37, 211, 102, 1);
    border-radius: 1em 1em 1em 1em;
    position: relative;
    overflow: hidden;
    transition: 0.3s;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }

  button:hover {
    border: 2px solid rgba(37, 211, 102, 1);
  }

  button span {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(37, 211, 102, 1);
    transition: ease-in-out .8s;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
  }

  button span svg {
    width: 1.1em;
    height: 1.1em;
    margin-right: 0.5em;
  }

  button:hover span {
    left: 0%;
  }
`;

export default WhatsAppButton;
