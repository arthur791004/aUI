import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import TextField from './';

storiesOf('TextField', module)
  .add('basic', () => (
    <TextField label="username" />
  ));
