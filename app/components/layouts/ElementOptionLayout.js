import React from 'react';
import { Dimensions } from 'react-native';
import { BlockCommon, ErrorCommon, TextCommon } from '../common';
import AddCancelBtnsLayout from './AddCancelBtnsLayout';

const ElementOptionLayout = ({
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
      <AddCancelBtnsLayout
        addHandler={update ? _updateElementHandler : _addElementHandler}
        cancelHandler={_cancelElementHandler}
        update={update}
        loading={loading}
      />
      <BlockCommon d_absolute a_left={Dimensions.get('screen').width / 4}>
        {error && <ErrorCommon h4 text={error} />}
      </BlockCommon>
    </BlockCommon>
  );
};

export default ElementOptionLayout;
