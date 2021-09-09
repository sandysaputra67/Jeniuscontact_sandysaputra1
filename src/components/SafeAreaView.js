import React, { Component } from 'react';
import {
  View,
  StatusBar,
  ViewProps,
  Platform,
  Dimensions,
} from 'react-native';

export function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}

export default class SafeAreaView extends Component<ViewProps> {
  dimension = Dimensions.get('window');

  componentDidMount() {
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('transparent');
  }

  render() {
    const { children, style } = this.props;
    return (
      <View
        {...this.props}
        style={{
          flex: 1,
          paddingTop: Platform.select(
            {
              android: Platform.Version >= 19 ? StatusBar.currentHeight : 0,
              ios: isIPhoneXSize(this.dimension) || isIPhoneXrSize(this.dimension)
                ? StatusBar.currentHeight : 0
            },
          ),
          ...style,
        }}
      >
        {children}
      </View>
    );
  }
}
