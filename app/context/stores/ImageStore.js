import React, { createContext, useMemo, useReducer } from 'react';
import {
  addImageAction,
  deleteImageAction,
  getAllImageAction,
  updateImageAction,
} from '../actions';
import { imageReducer, imagesReducer } from '../reducers';

export const ImageContext = createContext({});

function ImageStore({ children }) {
  const [imagesState, imagesDispatch] = useReducer(imagesReducer, {});
  const [imageState, imageDispatch] = useReducer(imageReducer, {});

  const imageActions = useMemo(() => ({
    getAllImage: async () => {
      await getAllImageAction()(imagesDispatch);
    },
    addImage: async (image, name, description) => {
      await addImageAction(image, name, description)(imageDispatch);
    },
    deleteImage: async (image_id) => {
      await deleteImageAction(image_id)(imageDispatch);
    },
    updateImage: async (image_id, name, description, image) => {
      await updateImageAction(image_id, name, description, image);
    },
  }));

  return (
    <ImageContext.Provider value={{ imagesState, imageState, imageActions }}>
      {children}
    </ImageContext.Provider>
  );
}

export default ImageStore;
