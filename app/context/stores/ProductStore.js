import React, { useMemo, useReducer } from 'react';
import { createContext } from 'react';
import {
  getAllProductAction,
  addProductAction,
  getProductAction,
  updateProductAction,
  deleteProductAction,
} from '../actions';
import { productsReducer, productReducer } from '../reducers';

export const ProductContext = createContext({});

const ProductStore = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(productsReducer, {});
  const [productState, productDispatch] = useReducer(productReducer, {});

  const productActions = useMemo(() => ({
    getAllProduct: async (category_id) => {
      await getAllProductAction(category_id)(productsDispatch);
    },
    addProduct: async (category_id, product) => {
      await addProductAction(category_id, product)(productDispatch);
    },
    getProduct: async (product_id) => {
      await getProductAction(product_id)(productDispatch);
    },
    updateProduct: async (product_id, product) => {
      await updateProductAction(product_id, product)(productDispatch);
    },
    deleteProduct: async (product_id) => {
      await deleteProductAction(product_id)(productDispatch);
    },
  }));

  return (
    <ProductContext.Provider
      value={{
        productsState,
        productState,
        productActions,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductStore;
