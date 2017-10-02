import styled from 'styled-components';

const CropResizer = styled.div`
  position: absolute;
  right: -5px;
  top: -5px;
  display: block;
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-top: 10px solid rgba(222, 60, 80, .9);
  z-index: 999;
  cursor: ne-resize;
`;

export default CropResizer;

