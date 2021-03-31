import React, { useContext } from 'react';
import { AuthContext, ShopContext } from '../../context/stores';
import { BlockCommon, TextCommon } from '../common';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const HeaderLayout = ({ navigation }) => {
  const { shopState } = useContext(ShopContext);
  return (
    <BlockCommon style={styles.headerStyle}>
      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <TextCommon gray>
          <Ionicons name="settings-outline" size={theme.sizes.h1} />
        </TextCommon>
      </TouchableOpacity>
      <TextCommon title semibold primary>
        <Ionicons name="cash-outline" size={theme.sizes.base} />{' '}
        {shopState.payload?.money}
      </TextCommon>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.sizes.padding * 1.5,
    paddingHorizontal: theme.sizes.padding,
    height: 80,
  },
});

export default HeaderLayout;
