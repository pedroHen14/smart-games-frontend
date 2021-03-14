import styled, { keyframes } from "styled-components";

export const modalAnimation = keyframes`
  0%{
    top:-250px;
    opacity:0;
    transform:scale(.01) rotate(90deg);
  }
  100%{
    top:0px;
    opacity:1;
    transform:scale(1) rotate(0deg);
  }
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: #333c;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.section`
  animation: ${modalAnimation} 0.5s;
  min-width: 250px;
  min-height: 250px;
  max-height: calc(100vh - 20px);
  padding: 20px;
  z-index: 19;
  background-color: var(--dark);
  box-shadow: 0px 0px 10px black;
  border-radius: 4px;
  position: relative;
  overflow-y: auto;

  > span {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
    transition: 0.2s;

    :hover {
      color: var(--primary);
    }
  }

  > header {
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin: 0px 20px;
  }
`;
