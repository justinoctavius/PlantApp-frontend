import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { theme } from '../../../constants';
import { AuthContext } from '../../../context/stores';
import {
  BlockCommon,
  ErrorCommon,
  LoadingCommon,
  TextCommon,
} from '../../common';
import ManageElementBtns from './ManageElementBtns';

const ManageElementsWrapperLayout = ({
  onPressAdd,
  onPressDelete,
  onPressUpdate,
  setCardSelected,
  children,
  pressAddLabel,
  title,
  description,
  cardSelected,
  error,
  loading,
}) => {
  const { authState } = useContext(AuthContext);
  if (error) {
    return <ErrorCommon text={error} />;
  }

  if (loading) {
    return <LoadingCommon size={32} />;
  }

  const _onPressCancel = () => {
    setCardSelected('');
  };

  return (
    <BlockCommon>
      <BlockCommon p1 d_flex={false} f_space={'between'}>
        {title ? <TextCommon title>{title}</TextCommon> : null}
        {description ? <TextCommon gray>{description}</TextCommon> : null}
      </BlockCommon>
      {children}
      {authState.payload.admin && (
        <BlockCommon
          d_absolute
          a_bottom={theme.sizes.padding}
          a_right={!cardSelected ? Dimensions.get('screen').width / 4 : 18}
        >
          <ManageElementBtns
            onPressCancel={_onPressCancel}
            onPressAdd={onPressAdd}
            onPressDelete={onPressDelete}
            onPressUpdate={onPressUpdate}
            cardSelected={cardSelected}
            addLabel={pressAddLabel}
          />
        </BlockCommon>
      )}
    </BlockCommon>
  );
};

export default ManageElementsWrapperLayout;
