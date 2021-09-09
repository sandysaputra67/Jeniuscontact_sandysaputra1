/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import {
  Header,
} from '../index';

describe('Header Component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <Header />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
