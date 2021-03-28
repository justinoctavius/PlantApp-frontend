import React from 'react';
import { AuthStore } from '../context/stores';
import { AuthNavigator } from '../navigators';

const AppScreen = () => {
  return (
    <AuthStore>
      <AuthNavigator />
    </AuthStore>
  );
};

export default AppScreen;
