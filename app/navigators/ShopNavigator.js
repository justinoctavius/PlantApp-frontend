import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ShopScreen from '../screens/ShopScreens/ShopScreen';
import CategoryOptionScreen from '../screens/ShopScreens/CategoryOptionScreen';
import CategoryNavigator from './CategoryNavigator';

const Tap = createStackNavigator();

const ShopNavigator = () => {
  return (
    <Tap.Navigator
      initialRouteName="Shop"
      screenOptions={{ headerShown: null, headerBackground: () => null }}
    >
      <Tap.Screen name="Shop" component={ShopScreen} />
      <Tap.Screen name="Category" component={CategoryNavigator} />
      <Tap.Screen name="CategoryOption" component={CategoryOptionScreen} />
    </Tap.Navigator>
  );
};

export default ShopNavigator;
