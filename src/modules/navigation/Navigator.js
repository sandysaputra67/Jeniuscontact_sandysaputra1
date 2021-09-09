import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { StatusBar, Platform } from 'react-native';
import { fadeIn, fadeOut } from 'react-navigation-transitions';
import { Icon } from '../../components';
import { colors, fonts } from '../../styles';
import SplashScreenViewContainer from '../splashScreen/SplashScreenViewContainer';
import ContactlistViewContainer from '../contactlist/ContactlistViewContainer';
import ContactaddViewContainer from '../contactadd/ContactaddViewContainer';

let currentIndex = 0;

const stackNavigator = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreenViewContainer,
      navigationOptions: {
        header: null,
      }
    },
    ContactList: {
      screen: ContactlistViewContainer,
      navigationOptions: {
        header: null,
      }
    },
    ContactAdd: {
      screen: ContactaddViewContainer,
      navigationOptions: {
        header: null,
      }
    },
  },
  {
    transitionConfig: (sceneProps) => {
      if (currentIndex < sceneProps.index) {
        currentIndex = sceneProps.index;
        return fadeIn();
      }
      currentIndex = sceneProps.index;
      return fadeOut();
    },
    defaultNavigationOptions: {
      gesturesEnabled: false,
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
        paddingTop: Platform.select({ ios: 0, android: StatusBar.currentHeight }),
        height: 55 + StatusBar.currentHeight
      },
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: colors.white,
      headerLeft: (props) => {
        const { onPress, tintColor } = props;
        return (
          <Icon
            style={{
              padding: 12,
            }}
            name="arrow-left"
            type="Feather"
            size={24}
            color={tintColor}
            onPress={onPress}
          />
        );
      },
    },
  },
);

export default createAppContainer(stackNavigator);
