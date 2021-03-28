import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import ShopBrowserScreen from '../screens/ShopBrowserScreens/ShopBrowserScreen';
import ShopDetailsScreen from '../screens/ShopBrowserScreens/ShopDetailsScreen';
import CategoryDetailsScreen from '../screens/ShopBrowserScreens/CategoryDetailsScreen';
import { theme } from '../constants';

const Tap = createStackNavigator();

const ShopBrowserNavigator = () => {
  return (
    <Tap.Navigator
      initialRouteName={'ShopBrowser'}
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
      <Tap.Screen name={'ShopBrowser'} component={ShopBrowserScreen} />
      <Tap.Screen name={'ShopDetails'} component={ShopDetailsScreen} />
      <Tap.Screen name={'CategoryDetails'} component={CategoryDetailsScreen} />
    </Tap.Navigator>
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
export default ShopBrowserNavigator;
