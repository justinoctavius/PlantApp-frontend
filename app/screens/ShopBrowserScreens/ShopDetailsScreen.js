import React, { useContext, useEffect } from 'react';
import {
  BlockCommon,
  TextCommon,
  CardCommon,
  LoadingCommon,
  ErrorCommon,
  ListCardCommon,
} from '../../components/common';
import { DetailsContext } from '../../context/stores';
import { env } from '../../config';

const ShopDetailsScreen = ({ navigation, route }) => {
  const { categoriesState, shopState, detailsActions } = useContext(
    DetailsContext
  );

  const navigateCategoryDetails = async (category_id) => {
    navigation.navigate('CategoryDetails', {
      category_id,
      shop_id: route.params?.shop_id,
    });
  };

  const _renderCategory = (item) => {
    return (
      <CardCommon
        title={item.name}
        image_url={`${env.BACKEND_IMAGE}/${item.image?.image_url}`}
        onPress={() => navigateCategoryDetails(item.category_id)}
      />
    );
  };

  useEffect(() => {
    detailsActions.getShop(route.params?.shop_id);
  }, [route.params?.shop_id]);

  useEffect(() => {
    detailsActions?.getCategories(route.params?.shop_id);
  }, [shopState.payload]);

  if (shopState.error) {
    return <ErrorCommon text={shopState.error} />;
  }

  if (shopState.loading) {
    return <LoadingCommon size={32} />;
  }

  return (
    <BlockCommon>
      <BlockCommon p1 d_flex={false} f_space={'between'}>
        <TextCommon title>{shopState.payload?.name}</TextCommon>
        <TextCommon gray>{shopState.payload?.description}</TextCommon>
      </BlockCommon>
      <ListCardCommon
        data={categoriesState.payload}
        headerTitle={'Categories'}
        error={categoriesState.error}
        keyExtractor={(item) => item.category_id}
        loading={categoriesState.loading}
        renderItem={_renderCategory}
        padding
      />
    </BlockCommon>
  );
};

export default ShopDetailsScreen;
