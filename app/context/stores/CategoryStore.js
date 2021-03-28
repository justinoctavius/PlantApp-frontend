import React, { useMemo, useReducer, useState } from 'react';
import { createContext } from 'react';
import {
  getAllCategoryAction,
  addCategoryAction,
  getCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from '../actions';
import { categoriesReducer, categoryReducer } from '../reducers';

export const CategoryContext = createContext({});

const CategoryStore = ({ children }) => {
  const [categoriesState, getAllCategoryDispatch] = useReducer(
    categoriesReducer,
    {}
  );
  const [categoryState, categoryDispatch] = useReducer(categoryReducer, {});

  const categoryActions = useMemo(() => ({
    getAllCategory: async (shop_id) => {
      await getAllCategoryAction(shop_id)(getAllCategoryDispatch);
    },
    getCategory: async (category_id) => {
      await getCategoryAction(category_id)(categoryDispatch);
    },
    addCategory: async (shop_id, name, description, image_id) => {
      await addCategoryAction(
        shop_id,
        name,
        description,
        image_id
      )(categoryDispatch);
    },
    deleteCategory: async (category_id) => {
      await deleteCategoryAction(category_id)(categoryDispatch);
    },
    updateCategory: async (category_id, name, description, image_id) => {
      await updateCategoryAction(
        category_id,
        name,
        description,
        image_id
      )(categoryDispatch);
    },
  }));

  useState(() => []);

  return (
    <CategoryContext.Provider
      value={{
        categoriesState,
        categoryState,
        categoryActions,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryStore;
