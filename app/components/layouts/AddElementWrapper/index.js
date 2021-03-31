import React from 'react';
import { Dimensions } from 'react-native';
import { BlockCommon, ErrorCommon, TextCommon } from '../../common';
import AddElementBtns from './AddElementBtns';

const AddElementWrapperLayout = ({
  children,
  title,
  update,
  _updateElementHandler,
  _addElementHandler,
  _cancelElementHandler,
  loading,
  error,
}) => {
  return (
    <BlockCommon p1>
      <BlockCommon d_flex={1}>
        <TextCommon title>
          {update ? 'Update' : 'Add'} {title}
        </TextCommon>
      </BlockCommon>
      <BlockCommon d_flex={7}>{children}</BlockCommon>
      <AddElementBtns
        onPressAdd={update ? _updateElementHandler : _addElementHandler}
        onPressCancel={_cancelElementHandler}
        update={update}
        loading={loading}
        padding={false}
      />
      <BlockCommon d_absolute a_left={Dimensions.get('screen').width / 4}>
        {error && <ErrorCommon h4 text={error} />}
      </BlockCommon>
    </BlockCommon>
  );
};

export default AddElementWrapperLayout;
