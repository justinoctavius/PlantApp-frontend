import React, { useContext, useEffect } from 'react';
import { FlatList } from 'react-native';
import { ShopContext } from '../../context/stores/ShopStore';
import {
  BlockCommon,
  TextCommon,
  CardCommon,
  LoadingCommon,
  ErrorCommon,
} from '../../components/common';
import { CategoryContext } from '../../context/stores';
import { env } from '../../config';

const ShopDetailsScreen = ({ route }) => {
  const { shopState, shopActions } = useContext(ShopContext);
  const { getAllCategoryState, categoryActions } = useContext(CategoryContext);

  const getShopHandler = async () => {
    await shopActions?.getShop(route.params?.shop_id);
    await categoryActions?.getAllCategory(route.params?.shop_id);
  };

  useEffect(() => {
    getShopHandler();
  }, [route.params?.shop_id]);

  if (shopState.error) {
    return <ErrorCommon text={shopState.error} />;
  }

  if (shopState.loading) {
    return <LoadingCommon size={32} />;
  }

  return (
    <BlockCommon p1>
      <BlockCommon d_flex={false} f_space={'between'}>
        <TextCommon title semibold>
          {shopState.payload?.name}
        </TextCommon>
        <TextCommon gray>{shopState.payload?.description}</TextCommon>
      </BlockCommon>
      <BlockCommon p1>
        {getAllCategoryState.payload?.length > 0 ? (
          <FlatList
            data={getAllCategoryState.payload}
            keyExtractor={(item) => item.category_id}
            horizontal={false}
            numColumns={2}
            renderItem={({ item }) => (
              <CardCommon
                title={item.name}
                image_url={`${env.BACKEND_IMAGE}/${item.image.image_url}`}
              />
            )}
          />
        ) : (
          <ErrorCommon text={'There are not categories :('} />
        )}
      </BlockCommon>
    </BlockCommon>
  );
};

export default ShopDetailsScreen;
