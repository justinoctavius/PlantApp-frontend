import React, { createContext, useMemo, useReducer } from 'react';
import {
  getShopAction,
  getAllCategoryAction,
  getCategoryAction,
  getAllProductAction,
  getProductAction,
  getAllShopAction,
  getGlobalShopAction,
} from '../actions';
import { shopReducer } from '../reducers';

export const DetailsContext = createContext({});

const DetailsStore = ({ children }) => {
  const [shopState, shopDispatch] = useReducer(shopReducer, {});
  const [shopsState, shopsDispatch] = useReducer(shopReducer, {});
  const [categoriesState, categoriesDispatch] = useReducer(shopReducer, {});
  const [categoryState, categoryDispatch] = useReducer(shopReducer, {});
  const [productsState, productsDispatch] = useReducer(shopReducer, {});
  const [productState, productDispatch] = useReducer(shopReducer, {});
  const [globalShopState, globalShopDispatch] = useReducer(shopReducer, {});

  const detailsActions = useMemo(() => ({
    getShop: async (shop_id) => {
      await getShopAction(shop_id)(shopDispatch);
    },
    getAllShop: async (page) => {
      await getAllShopAction(page)(shopsDispatch);
    },
    getGlobalShop: async () => {
      await getGlobalShopAction()(globalShopDispatch);
    },
    getCategories: async (shop_id) => {
      await getAllCategoryAction(shop_id)(categoriesDispatch);
    },
    getCategory: async (category_id) => {
      await getCategoryAction(category_id)(categoryDispatch);
    },
    getProducts: async (category_id) => {
      await getAllProductAction(category_id)(productsDispatch);
    },
    getProduct: async (product_id) => {
      await getProductAction(product_id)(productDispatch);
    },
  }));

  const value = {
    shopState,
    shopsState,
    categoriesState,
    categoryState,
    productState,
    productsState,
    globalShopState,
    detailsActions,
  };

  return (
    <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
  );
};

export default DetailsStore;
