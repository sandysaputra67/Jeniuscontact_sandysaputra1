// @flow
import React from 'react';
import { ActivityIndicator } from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';
import { colors } from '../../styles';

type Props = {};

export default (props: Props) => (
  <View flex centerV centerH style={{ backgroundColor: colors.blue }}>
    <Text h1 white marginB-24>Simple Contact App</Text>
    <ActivityIndicator size="large" color={colors.white} />
  </View>
);
