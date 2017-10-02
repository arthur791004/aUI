import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Name = styled.div`
  margin: 10px 0;
`;

const Canvas = styled.canvas`
  border-radius: 50%;
`;

const Preview = ({
  setCanvas,
}) => (
  <div>
    <Name>Preview</Name>
    <div>
      <Canvas innerRef={setCanvas} />
    </div>
  </div>
);

Preview.propTypes = {
  setCanvas: PropTypes.func,
};

export default Preview;

