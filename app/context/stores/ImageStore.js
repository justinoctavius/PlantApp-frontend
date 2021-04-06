import React, { createContext, useMemo, useReducer } from 'react';
import {
  addImageAction,
  deleteImageAction,
  getAllImageAction,
  getImageAction,
  updateImageAction,
} from '../actions';
import { reducer } from '../reducers';

export const ImageContext = createContext({});

function ImageStore({ children }) {
  const [imagesState, imagesDispatch] = useReducer(reducer, {});
  const [imageState, imageDispatch] = useReducer(reducer, {});

  const imageActions = useMemo(() => ({
    getAllImage: async () => {
      await getAllImageAction()(imagesDispatch);
    },
    getImage: async (image_id) => {
      await getImageAction(image_id)(imageDispatch);
    },
    addImage: async (image, name, description) => {
      await addImageAction(image, name, description)(imageDispatch);
    },
    deleteImage: async (image_id) => {
      await deleteImageAction(image_id)(imageDispatch);
    },
    updateImage: async (oldImage_url, image_id, name, description, image) => {
      await updateImageAction(
        oldImage_url,
        image_id,
        name,
        description,
        image
      )(imageDispatch);
    },
  }));

  return (
    <ImageContext.Provider value={{ imagesState, imageState, imageActions }}>
      {children}
    </ImageContext.Provider>
  );
}

export default ImageStore;
