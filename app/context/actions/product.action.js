import { productApi } from '../../api';
import { dispatchAction } from './dispatch';

const getAllProductAction = (category_id) => async (dispatch) => {
  await dispatchAction(
    dispatch,
    async () => await productApi.getAll(category_id)
  );
};

const addProductAction = (category_id, product) => async (dispatch) => {
  const query = async () => await productApi.add(category_id, product);
  await dispatchAction(dispatch, query);
};

const getProductAction = (product_id) => async (dispatch) => {
  const query = async () => await productApi.get(product_id);
  await dispatchAction(dispatch, query);
};

const updateProductAction = (product_id, product) => async (dispatch) => {
  const query = async () => await productApi.update(product_id, product);
  await dispatchAction(dispatch, query);
};

const deleteProductAction = (product_id) => async (dispatch) => {
  const query = async () => await productApi.delete(product_id);
  await dispatchAction(dispatch, query);
};

export {
  addProductAction,
  getAllProductAction,
  getProductAction,
  updateProductAction,
  deleteProductAction,
};
