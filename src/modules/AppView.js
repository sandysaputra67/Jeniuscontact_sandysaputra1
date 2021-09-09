import React from 'react';
import { StatusBar } from 'react-native';

import Navigator from './navigation/Navigator';
import { colors } from '../styles';

export default function AppView() {
  // StatusBar.setTranslucent(true);
  // StatusBar.setBackgroundColor('transparent');
  // StatusBar.setBarStyle(colors.statusBarStyle, true);
  return <Navigator onNavigationStateChange={() => { }} uriPrefix="/app" />;
}
