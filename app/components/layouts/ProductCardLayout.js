import React from 'react';
import { BlockCommon, CardCommon, TextCommon } from '../common';
import { Ionicons } from '@expo/vector-icons';
import { env } from '../../config';

const ProductCardLayout = ({
  item,
  cardSelected,
  setCardSelected,
  onPress,
}) => {
  return (
    <CardCommon
      title={item.name}
      image_url={`${env.BACKEND_IMAGE}/${item.image.image_url}`}
      onPress={onPress}
      selected={cardSelected === item.product_id}
      onLongPress={setCardSelected}
    >
      <ProductBody price={item.price} quantity={item.quantity} />
    </CardCommon>
  );
};

const ProductBody = ({ price, quantity }) => {
  return (
    <BlockCommon d_flex={false} f_row f_space={'between'}>
      <TextCommon center primary bold>
        <Ionicons name={'cash-sharp'} /> {price}
      </TextCommon>
      {quantity && (
        <TextCommon color={quantity < 10 ? 'danger' : 'gray'} bold>
          <Ionicons name={'caret-down'} /> {quantity}
        </TextCommon>
      )}
    </BlockCommon>
  );
};

export default ProductCardLayout;
