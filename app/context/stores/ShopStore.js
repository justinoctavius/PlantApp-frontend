import React, { createContext, useMemo, useReducer } from 'react';
import {
  buyProductAction,
  getAllShopAction,
  getShopAction,
  updateShopAction,
} from '../actions';
import { shopReducer } from '../reducers';

export const ShopContext = createContext({});

const ShopStore = ({ children }) => {
  const [shopsState, shopsDispatch] = useReducer(shopReducer, {});
  const [shopState, shopDispatch] = useReducer(shopReducer, {});
  const [buyProductState, buyProductDispatch] = useReducer(shopReducer, {});

  const shopActions = useMemo(() => ({
    getShop: async (shop_id) => {
      await getShopAction(shop_id)(shopDispatch);
    },
    updateShop: async (shop_id, name, description) => {
      await updateShopAction(shop_id, name, description)(shopDispatch);
    },
    getAllShop: async (page) => {
      await getAllShopAction(page)(shopsDispatch);
    },
    buyProduct: async (buyer_shop_id, seller_shop_id, product_id, quantity) => {
      await buyProductAction(
        buyer_shop_id,
        seller_shop_id,
        product_id,
        quantity
      )(buyProductDispatch);
    },
  }));

  return (
    <ShopContext.Provider
      value={{
        shopState,
        shopsState,
        buyProductState,
        shopActions,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopStore;
