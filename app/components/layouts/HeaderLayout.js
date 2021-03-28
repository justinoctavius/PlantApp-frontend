import React, { useContext } from 'react';
import { AuthContext } from '../../context/stores';
import { BlockCommon, TextCommon } from '../common';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderLayout = ({ navigation }) => {
  const { authState } = useContext(AuthContext);
  return (
    <BlockCommon
      style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: theme.sizes.padding * 1.5,
        paddingHorizontal: theme.sizes.padding,
        height: 80,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
        <TextCommon gray>
          <Ionicons name="settings-outline" size={theme.sizes.h1} />
        </TextCommon>
      </TouchableOpacity>
      <TextCommon title semibold primary>
        <Ionicons name="cash-outline" size={theme.sizes.base} />{' '}
        {authState.payload?.shop?.money}
      </TextCommon>
    </BlockCommon>
  );
};

export default HeaderLayout;
