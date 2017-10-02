import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CropArea from './CropArea';
import CropResizer from './CropResizer';
import Loading from './Loading';

const Img = styled.img`
  display: block;
  user-select: none;
  -webkit-user-drag: none;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 300px;
  height: ${props => `${props.height || 300}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #EEEEEE;
  user-select: none;
  -webkit-user-drag: none;
`;

const Name = styled.div`
  margin: 10px 0;
`;

const CropImg = ({
  imgSrc,
  imgHeight,
  isLoading,
  cropAreaWidth,
  cropAreaHeight,
  cropAreaLeft,
  cropAreaTop,
  setImgWrapper,
  setImg,
  setCropArea,
  setCropResizer,
  handleOnload,
}) => (
  <div>
    <Name>Original</Name>
    <ImgWrapper
      height={imgHeight}
      innerRef={setImgWrapper}
    >
      <Img
        src={imgSrc}
        width="300"
        innerRef={setImg}
        onLoad={handleOnload}
      />
      {imgSrc && (
        <CropArea
          width={cropAreaWidth}
          height={cropAreaHeight}
          left={cropAreaLeft}
          top={cropAreaTop}
          innerRef={setCropArea}
        >
          <CropResizer innerRef={setCropResizer} />
        </CropArea>
      )}
      {isLoading && (
        <Loading />
      )}
    </ImgWrapper>
  </div>
);

CropImg.propTypes = {
  imgSrc: PropTypes.string,
  imgHeight: PropTypes.number,
  isLoading: PropTypes.bool,
  cropAreaWidth: PropTypes.number,
  cropAreaHeight: PropTypes.number,
  cropAreaLeft: PropTypes.number,
  cropAreaTop: PropTypes.number,
  setImgWrapper: PropTypes.func,
  setImg: PropTypes.func,
  setCropArea: PropTypes.func,
  setCropResizer: PropTypes.func,
  handleOnload: PropTypes.func,
};

export default CropImg;

