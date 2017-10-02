import styled from 'styled-components';

const CropArea = styled.div.attrs({
  style: props => ({
    left: `${props.left}px`,
    top: `${props.top}px`,
    width: `${props.width}px`,
    height: `${props.height}px`,
  }),
})`
  display: inline-block;
  position: absolute;
  border: 2px dashed rgba(222, 60, 80, .9);
  border-radius: 50%;
  box-sizing: border-box;
  cursor: move;
`;

export default CropArea;

