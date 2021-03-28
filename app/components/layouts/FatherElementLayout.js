import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { theme } from '../../constants';
import {
  BlockCommon,
  ButtonCommon,
  ErrorCommon,
  LoadingCommon,
  TextCommon,
} from '../common';
import { Ionicons } from '@expo/vector-icons';

const FatherElementLayout = ({
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
  if (error) {
    return <ErrorCommon text={error} />;
  }

  if (loading) {
    return <LoadingCommon size={32} />;
  }
  return (
    <BlockCommon>
      <BlockCommon p1 d_flex={false} f_space={'between'}>
        {title ? <TextCommon title>{title}</TextCommon> : null}
        {description ? <TextCommon gray>{description}</TextCommon> : null}
      </BlockCommon>
      {children}
      <BlockCommon
        d_absolute
        a_bottom={theme.sizes.padding}
        a_right={!cardSelected ? Dimensions.get('screen').width / 4 : 18}
      >
        {!cardSelected ? (
          <ButtonCommon
            gradient
            onPress={onPressAdd}
            width={Dimensions.get('screen').width / 2}
          >
            <TextCommon white bold center>
              {pressAddLabel}
            </TextCommon>
          </ButtonCommon>
        ) : (
          <BlockCommon f_row>
            <ButtonCommon
              onPress={() => setCardSelected('')}
              style={styles.btnStyle}
            >
              <TextCommon white bold center>
                Cancel
              </TextCommon>
            </ButtonCommon>

            <ButtonCommon
              onPress={() => {
                onPressDelete();
                setCardSelected('');
              }}
              style={styles.btnStyle}
            >
              <TextCommon white bold center>
                <Ionicons name="trash" /> Delete
              </TextCommon>
            </ButtonCommon>

            <ButtonCommon
              onPress={onPressUpdate}
              style={[styles.btnStyle, styles.btnPrimary]}
            >
              <TextCommon white bold center>
                <Ionicons name="pencil" /> Update
              </TextCommon>
            </ButtonCommon>
          </BlockCommon>
        )}
      </BlockCommon>
    </BlockCommon>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: theme.colors.danger,
    width: Dimensions.get('screen').width / 4,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.radius,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  btnPrimary: { backgroundColor: theme.colors.primary },
});

export default FatherElementLayout;
