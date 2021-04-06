import React from 'react';
import { BlockCommon, InputCommon, TextCommon } from '../../common';
import { Ionicons } from '@expo/vector-icons';

const ModalProductQuantity = ({ price, quantity, userMoney, setQuantity }) => {
  return (
    <BlockCommon f_row>
      <BlockCommon>
        <InputCommon
          label={'Quantity'}
          number
          value={quantity}
          style={{ width: '100%' }}
          onChangeText={setQuantity}
        />
      </BlockCommon>
      <BlockCommon f_center>
        <TextCommon>
          Total price:{' '}
          <TextCommon
            bold
            color={price * quantity > userMoney ? 'danger' : 'primary'}
          >
            <Ionicons name="cash" />
            {Number((price * quantity).toFixed(2))}
          </TextCommon>
        </TextCommon>
      </BlockCommon>
    </BlockCommon>
  );
};

export default ModalProductQuantity;
