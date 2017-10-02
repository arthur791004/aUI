import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.div`
  padding: 8px;
  border-radius: 4px;
  color: #ECF6FD;
  background-color: #108EE9;
  transition: opacity 0.15s ease-in;
  cursor: pointer;

  & + & {
    margin-left: 10px;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const UploadLabel = Button.withComponent('label');

const UploadInput = styled.input.attrs({
  id: 'upload',
  type: 'file',
  accept: 'image/*',
})`
  display: none;
`;

export const UploadButton = ({
  handleUpload,
}) => (
  <div>
    <UploadInput onChange={handleUpload} />
    <UploadLabel htmlFor="upload">
      Upload
    </UploadLabel>
  </div>
);

UploadButton.propTypes = {
  handleUpload: PropTypes.func,
};

export const DownloadButton = styled(Button)`
  margin-left: 10px;
  color: white;
  background-color: black;
`;

export default Button;

