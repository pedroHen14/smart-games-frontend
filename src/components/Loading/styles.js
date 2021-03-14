import styled, { keyframes } from "styled-components";

const spin = keyframes`
    100%{
        transform: rotate(360deg);
    }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #333c;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  flex-direction: column;
  gap: 10px;

  > img {
    width: 100px;
    /* height: 100px; */
    animation: ${spin} 0.5s linear infinite;
    /* opacity: 0.8; */
    /* border: solid 2px var(--dark); */
  }
`;
