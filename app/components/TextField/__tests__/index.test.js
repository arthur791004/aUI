import React from 'react';
import { shallow } from 'enzyme';

import TextField from '../';

describe('<TextField />', () => {
  it('should render the component', () => {
    const wrapper = shallow(
      <TextField label="label" />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
