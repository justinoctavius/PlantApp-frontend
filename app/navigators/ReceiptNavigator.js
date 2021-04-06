import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReceiptStore } from '../context/stores';
import ReceiptsScreen from '../screens/ReceiptScreens/ReceiptsScreen';
import ReceiptScreen from '../screens/ReceiptScreens/ReceiptScreen';

const Tap = createStackNavigator();

const ReceiptNavigator = () => {
  return (
    <ReceiptStore>
      <Tap.Navigator
        initialRouteName="Receipts"
        screenOptions={{ headerShown: false }}
      >
        <Tap.Screen name="Receipts" component={ReceiptsScreen} />
        <Tap.Screen name="Receipt" component={ReceiptScreen} />
      </Tap.Navigator>
    </ReceiptStore>
  );
};

export default ReceiptNavigator;
