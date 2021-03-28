import { imageApi } from '../../api';
import { dispatchAction } from './dispatch';

const getAllImageAction = () => async (dispatch) => {
  const query = async () => await imageApi.getAll();
  await dispatchAction(dispatch, query);
};

const addImageAction = (image, name, description) => async (dispatch) => {
  const query = async () => await imageApi.add(image, name, description);
  await dispatchAction(dispatch, query);
};

const deleteImageAction = (image_id) => async (dispatch) => {
  const query = async () => await imageApi.delete(image_id);
  await dispatchAction(dispatch, query);
};

const updateImageAction = (image_id, name, description, image) => async (
  dispatch
) => {
  const query = async () =>
    await imageApi.update(image_id, name, description, image);
  await dispatchAction(dispatch, query);
};

export {
  getAllImageAction,
  addImageAction,
  deleteImageAction,
  updateImageAction,
};
