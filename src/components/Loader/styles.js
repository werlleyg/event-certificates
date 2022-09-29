import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* bottom: 0; */
  height: 100%;
  background-color: ${(props) =>
    props.showBlur ? 'rgba(255,255,255,0.1)' : ' rgba(255, 255, 255, 1)'};
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4rem;

  h1 {
    color: #03c58c;
  }

  .loader {
    width: 78px;
    height: 78px;
    display: inline-block;
    position: relative;
  }
  .loader::after,
  .loader::before {
    content: '';
    width: 78px;
    height: 78px;
    border: 2px solid #03c58c;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    animation: rotation 2s ease-in-out infinite;
  }
  .loader::after {
    border-color: #ff3d00;
    animation-delay: 1s;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
