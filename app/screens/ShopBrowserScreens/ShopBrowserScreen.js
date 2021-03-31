import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import {
  BlockCommon,
  LoadingCommon,
  NavPageCommon,
  CardCommon,
  ErrorCommon,
} from '../../components/common';
import { env } from '../../config';
import { DetailsContext } from '../../context/stores';

const ShopBrowserScreen = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(null);
  const { shopsState, globalShopState, detailsActions } = useContext(
    DetailsContext
  );

  const _setPageHandler = (nextPage) => {
    setPage(nextPage);
  };

  const _navigateShopDetails = (shop_id) => {
    navigation.navigate('ShopDetails', { shop_id });
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    detailsActions.getGlobalShop();
  }, []);

  useEffect(() => {
    detailsActions.getAllShop(page);
  }, [page]);

  useEffect(() => {
    if (!shopsState.loading && shopsState.payload?.length < 20) {
      setLimit(page - 1);
    }
  }, [shopsState.payload]);

  if (shopsState.loading) {
    return <LoadingCommon size={32} />;
  }

  if (shopsState.error) {
    return <ErrorCommon text={shopsState.error} />;
  }

  const _renderShop = (shop) => {
    return (
      <CardCommon
        image_url={`${env.BACKEND_IMAGE}/shop.jpg`}
        title={shop.name}
        onPress={() => _navigateShopDetails(shop.shop_id)}
      />
    );
  };

  const _renderGlobalShop = () => {
    return (
      <BlockCommon f_center>
        <CardCommon
          image_url={`${env.BACKEND_IMAGE}/shop.jpg`}
          title={globalShopState.payload?.name}
          onPress={() => _navigateShopDetails(globalShopState.payload?.shop_id)}
        />
      </BlockCommon>
    );
  };

  return (
    <BlockCommon>
      <BlockCommon d_flex={0.1}>
        <NavPageCommon page={page} setPage={_setPageHandler} limit={limit} />
      </BlockCommon>

      <BlockCommon f_center>
        <FlatList
          data={shopsState.payload}
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
