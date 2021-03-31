import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BlockCommon, TextCommon } from '../../common';

const ModalProductInfo = ({ product, userMoney }) => {
  return (
    <>
      <BlockCommon>
        <TextCommon h4>Description</TextCommon>
        <TextCommon caption>
          {product.description || 'There is not a description '}
        </TextCommon>
      </BlockCommon>
      <BlockCommon f_row f_space="between">
        <TextCommon>
          Quantity:{' '}
          <TextCommon bold danger={product.quantity < 10}>
            <Ionicons name="caret-down" />
            {product.quantity}
          </TextCommon>
        </TextCommon>
        <TextCommon>
          Price:{' '}
          <TextCommon
            bold
            color={userMoney < product.price ? 'danger' : 'primary'}
          >
            <Ionicons name="cash" />
            {product.price}
          </TextCommon>
        </TextCommon>
      </BlockCommon>
    </>
  );
};

export default ModalProductInfo;
