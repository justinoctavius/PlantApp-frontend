import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BlockCommon, TextCommon } from '../common';
import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const UserInfoLayout = ({ user }) => {
  return (
    <BlockCommon d_flex={false}>
      <BlockCommon style={styles.textStyle}>
        <TextCommon>Username:</TextCommon>
        <TextCommon gray>
          <Ionicons name={'person'} /> {user.username}
        </TextCommon>
      </BlockCommon>
      <BlockCommon style={styles.textStyle}>
        <TextCommon>Email:</TextCommon>
        <TextCommon gray>
          <Ionicons name={'at-circle-sharp'} /> {user.email}
        </TextCommon>
      </BlockCommon>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  textStyle: { marginTop: theme.sizes.padding / 2 },
});

export default UserInfoLayout;
