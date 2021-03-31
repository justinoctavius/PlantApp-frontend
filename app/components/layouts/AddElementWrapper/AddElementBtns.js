import React from 'react';
import { theme } from '../../../constants';
import {
  BlockCommon,
  ButtonCommon,
  LoadingCommon,
  TextCommon,
} from '../../common';

const AddElementBtns = ({ onPressAdd, onPressCancel, loading, update }) => {
  return (
    <BlockCommon
      d_absolute
      f_row
      a_bottom={theme.sizes.padding}
      a_right={theme.sizes.padding}
    >
      <ButtonCommon
        color={'danger'}
        onPress={onPressCancel}
        width={theme.sizes.padding * 3}
        m1
      >
        <TextCommon center white>
          Cancel
        </TextCommon>
      </ButtonCommon>
      <ButtonCommon
        onPress={onPressAdd}
        color={'primary'}
        width={theme.sizes.padding * 3}
      >
        <TextCommon center white>
          {loading ? (
            <LoadingCommon color={'white'} />
          ) : update ? (
            'Update'
          ) : (
            'Add'
          )}
        </TextCommon>
      </ButtonCommon>
    </BlockCommon>
  );
};

export default AddElementBtns;
