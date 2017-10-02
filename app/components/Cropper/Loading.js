import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Loading = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 8px solid #ECF6FD;
  border-top: 8px solid #108EE9;
  border-radius: 50%;
  animation: ${spinAnimation} 2s linear infinite;
`;

export default Loading;

