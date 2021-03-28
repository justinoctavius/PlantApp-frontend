import { categoryApi } from '../../api';
import { dispatchAction } from './dispatch';

const getAllCategoryAction = (shop_id) => async (dispatch) => {
  const query = async () => await categoryApi.getAll(shop_id);
  await dispatchAction(dispatch, query);
};

const addCategoryAction = (shop_id, name, description, image_id) => async (
  dispatch
) => {
  await dispatchAction(
    dispatch,
    async () => await categoryApi.add(shop_id, name, description, image_id)
  );
};

const updateCategoryAction = (
  category_id,
  name,
  description,
  image_id
) => async (dispatch) => {
  const query = async () =>
    await categoryApi.update(category_id, name, description, image_id);
  dispatchAction(dispatch, query);
};

const getCategoryAction = (category_id) => async (dispatch) => {
  const query = async () => await categoryApi.get(category_id);
  await dispatchAction(dispatch, query);
};

const deleteCategoryAction = (category_id) => async (dispatch) => {
  const query = async () => await categoryApi.delete(category_id);
  await dispatchAction(dispatch, query);
};

export {
  addCategoryAction,
  getAllCategoryAction,
  getCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
};
