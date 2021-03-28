import React from 'react';
import { CardCommon, TextCommon } from '../common';
import { Ionicons } from '@expo/vector-icons';
import { env } from '../../config';

const ProductCardLayout = ({ item, cardSelected, setCardSelected }) => {
  return (
    <CardCommon
      title={item.name}
      image_url={`${env.BACKEND_IMAGE}/${item.image.image_url}`}
      selected={cardSelected === item.product_id}
      onLongPress={() => setCardSelected(item.product_id)}
    >
      <ProductBody item={item} />
    </CardCommon>
  );
};

const ProductBody = ({ item }) => {
  return (
    <>
      <TextCommon center primary bold>
        <Ionicons name={'cash-sharp'} /> {item.price}
      </TextCommon>
    </>
  );
};

export default ProductCardLayout;
