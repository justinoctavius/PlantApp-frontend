import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ImageOptionScreen from '../screens/ImageScreens/ImageOptionScreen';
import ImageScreen from '../screens/ImageScreens/ImageScreen';

const Tap = createStackNavigator();

const ImageNavigator = () => {
  return (
    <Tap.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Image"
    >
      <Tap.Screen name="Image" component={ImageScreen} />
      <Tap.Screen name="ImageOption" component={ImageOptionScreen} />
    </Tap.Navigator>
  );
};

export default ImageNavigator;
