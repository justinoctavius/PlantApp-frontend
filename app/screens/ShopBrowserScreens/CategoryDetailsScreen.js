import React, { useEffect, useContext, useState } from 'react';
import {
  BlockCommon,
  ListCardCommon,
  TextCommon,
} from '../../components/common';
import {
  ProductCardLayout,
  ModalProductLayout,
} from '../../components/layouts';
import { DetailsContext, ShopContext } from '../../context/stores';

const CategoryDetailsScreen = ({ navigation, route }) => {
  const { productsState, categoryState, detailsActions } = useContext(
    DetailsContext
  );
  const { buyProductState } = useContext(ShopContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [productId, setProductId] = useState();

  useEffect(() => {
    detailsActions.getCategory(route.params?.category_id);
  }, []);

  useEffect(() => {
    detailsActions.getProducts(route.params?.category_id);
  }, [categoryState.payload, buyProductState.payload]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: categoryState.payload?.name || '',
    });
  }, [categoryState.payload]);

  const _showBuyProductModal = (product_id) => {
    setProductId(product_id);
    setModalVisible(true);
  };

  const _renderProduct = (item) => {
    return (
      <ProductCardLayout
        onPress={() => _showBuyProductModal(item.product_id)}
        item={item}
        quantity={item.quantity}
      />
    );
  };

  return (
    <>
      <BlockCommon>
        <BlockCommon p1 d_flex={false}>
          <TextCommon gray>{categoryState.payload?.description}</TextCommon>
        </BlockCommon>
        <ListCardCommon
          data={productsState.payload}
          error={productsState.error}
          headerTitle={'Products'}
          keyExtractor={(item) => item.product_id}
          loading={productsState.loading}
          renderItem={_renderProduct}
          padding
        />
      </BlockCommon>
      <ModalProductLayout
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        productId={productId}
        shopId={route.params?.shop_id}
      />
    </>
  );
};

export default CategoryDetailsScreen;
