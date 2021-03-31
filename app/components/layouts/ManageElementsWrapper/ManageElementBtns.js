import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BlockCommon, ButtonCommon, TextCommon } from '../../common';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../constants';

const ManageElementBtns = ({
  onPressDelete,
  onPressUpdate,
  onPressCancel,
  onPressAdd,
  cardSelected,
  addLabel,
}) => {
  return (
    <>
      {!cardSelected ? (
        <ButtonCommon
          gradient
          onPress={onPressAdd}
          width={Dimensions.get('screen').width / 2}
        >
          <TextCommon white bold center>
            {addLabel}
          </TextCommon>
        </ButtonCommon>
      ) : (
        <BlockCommon f_row>
          <ButtonCommon onPress={onPressCancel} style={styles.btnStyle}>
            <TextCommon white bold center>
              Cancel
            </TextCommon>
          </ButtonCommon>

          <ButtonCommon onPress={onPressDelete} style={styles.btnStyle}>
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
    </>
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

export default ManageElementBtns;
