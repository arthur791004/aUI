import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Observable } from 'rxjs';
import { toBoundingValue, toRelativePosition } from './utils';
import { UploadButton, DownloadButton } from './Buttons';
import CropImg from './CropImg';
import Preview from './Preview';

const Content = styled.div`
  display: flex;

  > div + div {
    margin-left: 20px;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px;
`;

const Wrapper = styled.div`
  position: relative;
`;

class Cropper extends PureComponent {
  state = {
    imgSrc: '',
    imgHeight: 300,
    isLoading: false,
    cropAreaWidth: 30,
    cropAreaHeight: 30,
    cropAreaLeft: 50,
    cropAreaTop: 50,
  };

  componentDidUpdate() {
    this.drawCanvas();
  }

  componentWillUnmount() {
    if (this.cropArea$) {
      this.cropArea$.unsubscribe();
    }

    if (this.resize$) {
      this.resize$.unsubscribe();
    }
  }

  setImgWrapper = (imgWrapper) => {
    this.imgWrapper = imgWrapper;
  }

  setImg = (img) => {
    this.img = img;
  }

  setCanvas = (canvas) => {
    this.canvas = canvas;
  }

  setCropArea = (cropArea) => {
    this.cropArea = cropArea;

    const mouseDown$ = Observable.fromEvent(this.cropArea, 'mousedown');
    const mouseUp$ = Observable.fromEvent(document, 'mouseup');
    const mouseMove$ = Observable.fromEvent(document, 'mousemove');

    this.cropArea$ = mouseDown$
      .map(() => mouseMove$.takeUntil(mouseUp$))
      .concatAll()
      .map((mouseMove) => {
        const { clientX, clientY } = mouseMove;
        const position = {
          x: clientX,
          y: clientY,
        };

        return toRelativePosition(position, this.cropArea);
      })
      .subscribe((position) => {
        const { x, y } = position;
        const { cropAreaWidth, cropAreaHeight } = this.state;
        const { width, height } = this.cropArea.parentElement.getBoundingClientRect();
        const cropAreaX = x - cropAreaWidth * 0.5;
        const cropAreaY = y - cropAreaHeight * 0.5;

        this.setState({
          cropAreaLeft: toBoundingValue(cropAreaX, 0, width - cropAreaWidth),
          cropAreaTop: toBoundingValue(cropAreaY, 0, height - cropAreaHeight),
        });
      });
  }

  setCropResizer = (cropResizer) => {
    this.cropResizer = cropResizer;

    const mouseDown$ = Observable.fromEvent(this.cropResizer, 'mousedown');
    const mouseUp$ = Observable.fromEvent(document, 'mouseup');
    const mouseMove$ = Observable.fromEvent(document, 'mousemove');

    this.resize$ = mouseDown$
      .map((event) => {
        event.stopPropagation();
        return mouseMove$.takeUntil(mouseUp$);
      })
      .concatAll()
      .map((mouseMove) => {
        const { clientX, clientY } = mouseMove;
        const position = {
          x: clientX,
          y: clientY,
        };

        return toRelativePosition(position, this.cropArea);
      })
      .subscribe((position) => {
        const { x, y } = position;
        const { cropAreaHeight, cropAreaLeft, cropAreaTop } = this.state;

        this.setState({
          cropAreaWidth: toBoundingValue(x - cropAreaLeft, 0),
          cropAreaHeight: toBoundingValue(cropAreaTop - y + cropAreaHeight, 0),
          cropAreaTop: toBoundingValue(y, 0, cropAreaTop + cropAreaHeight),
        });
      });
  }

  drawCanvas = () => {
    if (!(this.canvas && this.cropArea && this.img && this.imgWrapper)) {
      return;
    }

    const ratio = this.img.naturalWidth / this.img.width;
    const ctx = this.canvas.getContext('2d');
    const left = this.cropArea.offsetLeft * ratio;
    const top = this.cropArea.offsetTop * ratio;
    const width = this.cropArea.clientWidth;
    const height = this.cropArea.clientHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    ctx.drawImage(this.img, left, top, width * ratio, height * ratio, 0, 0, width, height);
  }

  handleOnload = () => {
    this.setState({
      imgHeight: this.img.height,
      isLoading: false,
    });

    this.drawCanvas();
  }

  handleUpload = (event) => {
    if (event.target.files.length !== 1) {
      return;
    }

    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.setState({
        imgSrc: fileReader.result,
      });
    };

    this.setState({
      isLoading: true,
    }, () => {
      fileReader.readAsDataURL(file);
    });
  }

  handleDownload = () => {
    const link = document.createElement('a');

    link.href = this.canvas.toDataURL('image/png;base64');
    link.download = 'cropper.png';

    link.click();
  }

  render() {
    return (
      <Wrapper>
        <HeaderButtons>
          <UploadButton handleUpload={this.handleUpload} />
          <DownloadButton onClick={this.handleDownload}>
            Download
          </DownloadButton>
        </HeaderButtons>
        <Content>
          <CropImg
            {...this.state}
            setImgWrapper={this.setImgWrapper}
            setImg={this.setImg}
            setCropArea={this.setCropArea}
            setCropResizer={this.setCropResizer}
            handleOnload={this.handleOnload}
          />
          <Preview setCanvas={this.setCanvas} />
        </Content>
      </Wrapper>
    );
  }
}

export default Cropper;

