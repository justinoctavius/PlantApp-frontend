import React from 'react';
import { Pressable } from 'react-native';
import BlockCommon from '../../common/BlockCommon';
import TextCommon from '../../common/TextCommon';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../constants';

const CloseModalBtn = ({ setModalVisible }) => {
  return (
    <BlockCommon d_absolute a_bottom={'100%'} a_left={'100%'}>
      <Pressable onPress={() => setModalVisible(false)}>
        <TextCommon danger>
          <Ionicons
            name="close-circle-sharp"
            style={{ fontSize: theme.sizes.title * 2 }}
          />
        </TextCommon>
      </Pressable>
    </BlockCommon>
  );
};

export default CloseModalBtn;
