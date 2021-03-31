import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import ShopScreen from '../screens/ShopScreens/ShopScreen';
import CategoryOptionScreen from '../screens/ShopScreens/CategoryOptionScreen';
import CategoryNavigator from './CategoryNavigator';
import { CategoryStore } from '../context/stores';

const Tap = createStackNavigator();

const ShopNavigator = () => {
  return (
    <CategoryStore>
      <Tap.Navigator
        initialRouteName="Shop"
        screenOptions={{ headerShown: null, headerBackground: () => null }}
      >
        <Tap.Screen name="Shop" component={ShopScreen} />
        <Tap.Screen name="Category" component={CategoryNavigator} />
        <Tap.Screen name="CategoryOption" component={CategoryOptionScreen} />
      </Tap.Navigator>
    </CategoryStore>
  );
};

export default ShopNavigator;
