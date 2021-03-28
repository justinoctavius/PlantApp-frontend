import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CategoryScreen from '../screens/CategoryScreens/CategoryScreen';
import ProductOptionScreen from '../screens/CategoryScreens/ProductOptionScreen';

const Tap = createStackNavigator();

const CategoryNavigator = ({ route }) => {
  return (
    <Tap.Navigator
      initialRouteName="Category"
      screenOptions={{ headerShown: null, headerBackground: () => null }}
    >
      <Tap.Screen
        name="Category"
        component={CategoryScreen}
        initialParams={{ category_id: route.params.category_id }}
      />
      <Tap.Screen name="ProductOption" component={ProductOptionScreen} />
    </Tap.Navigator>
  );
};

export default CategoryNavigator;
