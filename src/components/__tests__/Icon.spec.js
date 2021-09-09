/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import {
  Icon,
} from '../index';

describe('Icon Component', () => {
  it('renders as expected', () => {
  const wrapper = shallow(
    <Icon />,
  );
  expect(wrapper).toMatchSnapshot();
});
