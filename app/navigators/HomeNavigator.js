import React, { useContext, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

import { theme } from '../constants';

import ShopStore from '../context/stores/ShopStore';

import HeaderLayout from '../components/layouts/HeaderLayout';

import ShopNavigator from './ShopNavigator';
import ImageNavigator from './ImageNavigator';
import ShopBrowserNavigator from './ShopBrowserNavigator';

import {
  AuthContext,
  CategoryStore,
  ImageStore,
  ProductStore,
} from '../context/stores';

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = ({ navigation, route }) => {
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    navigation.setOptions({
      header: () => <HeaderLayout navigation={navigation} />,
    });
  }, []);
  return (
    <ShopStore>
      <ImageStore>
        <CategoryStore>
          <ProductStore>
            <Tab.Navigator
              tabBarOptions={{
                style: styles.tabBarStyles,
                activeTintColor: theme.colors.secondary,
                inactiveTintColor: theme.colors.gray,
                indicatorStyle: {
                  backgroundColor: theme.colors.primary,
                },
              }}
            >
              <Tab.Screen
                name="Shop"
                component={ShopNavigator}
                options={{ title: 'My shop' }}
              />
              <Tab.Screen
                name="ShopBrowser"
                component={ShopBrowserNavigator}
                options={{ title: 'Shops' }}
              />
              {authState.payload?.admin && (
                <Tab.Screen name="Image" component={ImageNavigator} />
              )}
            </Tab.Navigator>
          </ProductStore>
        </CategoryStore>
      </ImageStore>
    </ShopStore>
  );
};

const styles = StyleSheet.create({
  tabBarStyles: {
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.gray,
  },
});

export default HomeNavigator;
