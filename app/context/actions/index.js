import {
  signInAction,
  signUpAction,
  signOutAction,
  restoreSessionAction,
} from './auth.action';

import {
  getAllCategoryAction,
  addCategoryAction,
  getCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from './category.action';

import {
  getAllProductAction,
  addProductAction,
  getProductAction,
  deleteProductAction,
  updateProductAction,
} from './product.action';

import {
  getShopAction,
  getAllShopAction,
  getGlobalShopAction,
  buyProductAction,
  updateShopAction,
} from './shop.action';

import {
  getAllImageAction,
  getImageAction,
  addImageAction,
  deleteImageAction,
  updateImageAction,
} from './image.action';

import { getReceiptAction, getAllReceiptAction } from './receipt.action';

export {
  //auth
  signInAction,
  signUpAction,
  signOutAction,
  restoreSessionAction,
  //category
  getAllCategoryAction,
  addCategoryAction,
  getCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
  //shop
  getShopAction,
  getAllShopAction,
  getGlobalShopAction,
  buyProductAction,
  updateShopAction,
  //image
  getAllImageAction,
  getImageAction,
  addImageAction,
  updateImageAction,
  deleteImageAction,
  //product
  getAllProductAction,
  addProductAction,
  getProductAction,
  deleteProductAction,
  updateProductAction,
  //receipt
  getAllReceiptAction,
  getReceiptAction,
};
