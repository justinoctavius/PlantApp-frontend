import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/AuthScreens/WelcomeScreen';
import SignInScreen from '../screens/AuthScreens/SignInScreen';
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';
import SettingScreen from '../screens/SettingScreens/SettingScreen';

import HomeNavigator from './HomeNavigator';

import * as theme from '../constants/theme';
import { Image, StyleSheet } from 'react-native';
import { AuthContext, ShopStore } from '../context/stores';

const Tab = createStackNavigator();

const AuthNavigator = () => {
  const { authState } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <ShopStore>
        <Tab.Navigator
          screenOptions={{
            headerTitle: null,
            headerStyle: styles.headerStyle,
            animationEnabledheaderBackImage: () => (
              <Image source={require('./../../assets/icons/back.png')} />
            ),
            headerBackTitle: null,
            headerLeftContainerStyle: styles.headerLeftContainerStyle,
            headerRightContainerStyle: styles.headerRightContainerStyle,
          }}
        >
          {!authState.payload ? (
            <>
              <Tab.Screen name="Welcome" component={WelcomeScreen} />
              <Tab.Screen name="SignIn" component={SignInScreen} />
              <Tab.Screen name="SignUp" component={SignUpScreen} />
            </>
          ) : (
            <>
              <Tab.Screen
                name="Home"
                component={HomeNavigator}
                initialParams={{ shop_id: authState.payload?.shop?.shop_id }}
              />
              <Tab.Screen name="Setting" component={SettingScreen} />
            </>
          )}
        </Tab.Navigator>
      </ShopStore>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: theme.sizes.base * 4,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerLeftContainerStyle: {
    alignItems: 'center',
    marginLeft: theme.sizes.base,
    paddingRight: theme.sizes.base,
  },
  headerRightContainerStyle: {
    alignItems: 'center',
    paddingRight: theme.sizes.base,
  },
});

export default AuthNavigator;
