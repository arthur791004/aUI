import React from 'react';
import styled from 'styled-components';
import TextField from '@/components/TextField';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <AppWrapper>
    <div>aUI Demo Page</div>
    <TextField label="label" />
  </AppWrapper>
);

export default App;
