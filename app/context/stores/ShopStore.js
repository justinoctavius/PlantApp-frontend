import React, { createContext, useMemo, useReducer } from 'react';
import { getShopAction } from '../actions';
import { getAllShopAction, getGlobalShopAction } from '../actions/shop.action';
import { shopReducer } from '../reducers';

export const ShopContext = createContext({});

const ShopStore = ({ children }) => {
  const [shopState, shopDispath] = useReducer(shopReducer, {});
  const [shopBrowserState, shopBrowserDispath] = useReducer(shopReducer, {});
  const [globalShopState, globalShopDispath] = useReducer(shopReducer, {});
  const [userShopState, userShopDispath] = useReducer(shopReducer, {});

  const shopActions = useMemo(() => ({
    getShop: async (shop_id) => {
      await getShopAction(shop_id)(shopDispath);
    },
    getAllShop: async (page) => {
      await getAllShopAction(page)(shopBrowserDispath);
    },
    getGlobalShop: async () => {
      await getGlobalShopAction()(globalShopDispath);
    },
    getUserShop: async (shop_id) => {
      await getShopAction(shop_id)(userShopDispath);
    },
  }));

  return (
    <ShopContext.Provider
      value={{
        shopState,
        shopBrowserState,
        userShopState,
        globalShopState,
        shopActions,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopStore;
