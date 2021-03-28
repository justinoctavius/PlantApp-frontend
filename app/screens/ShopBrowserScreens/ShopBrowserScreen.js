import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import {
  BlockCommon,
  LoadingCommon,
  NavPageCommon,
  CardCommon,
} from '../../components/common';
import { ShopContext } from '../../context/stores/ShopStore';

const ShopBrowserScreen = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(null);
  const { shopBrowserState, globalShopState, shopActions } = useContext(
    ShopContext
  );

  const _setPageHandler = (nextPage) => {
    setPage(nextPage);
  };

  const _getAllShopHandler = async (page) => {
    await shopActions.getAllShop(page);
    await shopActions.getGlobalShop();
  };

  const _navigateShopDetails = (shop_id) => {
    navigation.navigate('ShopDetails', { shop_id });
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    _getAllShopHandler(page);
  }, [page]);

  useEffect(() => {
    if (!shopBrowserState.loading && shopBrowserState.payload?.length < 20) {
      setLimit(page - 1);
    }
  }, [shopBrowserState.payload]);

  if (shopBrowserState.loading) {
    return <LoadingCommon size={32} />;
  }

  const _renderShop = (shop) => {
    return (
      <CardCommon
        image_url="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26567497.jpg"
        title={shop.name}
        onPress={() => _navigateShopDetails(shop.shop_id)}
      />
    );
  };

  const _renderGlobalShop = () => {
    return (
      <BlockCommon f_center>
        <CardCommon
          image_url="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26567497.jpg"
          title={globalShopState.payload?.name}
          onPress={() => _navigateShopDetails(globalShopState.payload?.shop_id)}
        />
      </BlockCommon>
    );
  };

  return (
    <BlockCommon>
      <BlockCommon>
        <NavPageCommon page={page} setPage={_setPageHandler} limit={limit} />
      </BlockCommon>

      <BlockCommon f_center d_flex={7}>
        <FlatList
          data={shopBrowserState.payload}
          keyExtractor={(item) => item.shop_id}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => _renderShop(item)}
          ListHeaderComponent={() => _renderGlobalShop()}
        />
      </BlockCommon>
    </BlockCommon>
  );
};

export default ShopBrowserScreen;
