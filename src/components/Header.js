// @flow
import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';

import { colors } from '../styles';

type Props = {
  icon: Object,
  leftComponent?: React.Component,
  rightComponent?: React.Component,
  title: string,
  color: string,
  textColor: string,
}

const HeaderHeight = 56;

const calculateFlex = (leftComponent, rightComponent) => {
  if (leftComponent && rightComponent) {
    return 0.6;
  }
  if (leftComponent || rightComponent) {
    return 0.8;
  }
  return 1;
};

const Header = (props: Props) => {
  const {
    icon,
    rightComponent,
    leftComponent,
    title,
    color,
    textColor,
  } = props;
  return (
    <View
      style={{
        height: HeaderHeight,
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lightGray,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: color,
      }}
    >
      {
        leftComponent
          ? (
            <View style={{ flex: 0.2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <View style={{ width: HeaderHeight, height: HeaderHeight }}>
                {leftComponent}
              </View>
            </View>
          )
          : null
      }
      <View
        style={[
          { flex: calculateFlex(leftComponent, rightComponent), alignItems: 'center', flexDirection: 'row' },
          leftComponent ? { justifyContent: 'center' } : null
        ]}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18, paddingLeft: 16, color: textColor }}>{title}</Text>
      </View>
      {
        rightComponent
          ? (
            <View style={{ flex: 0.2, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <View style={{ width: HeaderHeight, height: HeaderHeight }}>
                {rightComponent}
              </View>
            </View>
          )
          : null
      }
    </View>
  );
};

Header.defaultProps = {
  rightComponent: null,
  leftComponent: null,
};

export default Header;
