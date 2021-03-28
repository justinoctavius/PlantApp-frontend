import {
  IMAGE_FAIL,
  IMAGE_REQUEST,
  IMAGE_SUCCESS,
} from '../../constants/action';

const imageReducer = (state, action) => {
  switch (action.type) {
    case IMAGE_REQUEST:
      return { loading: true, payload: null, error: null };
    case IMAGE_SUCCESS:
      return { loading: false, payload: action.payload, error: null };
    case IMAGE_FAIL:
      return { loading: false, payload: null, error: action.error };
    default:
      return state;
  }
};

const imagesReducer = (state, action) => {
  switch (action.type) {
    case IMAGE_REQUEST:
      return { loading: true, payload: null, error: null };
    case IMAGE_SUCCESS:
      return { loading: false, payload: action.payload, error: null };
    case IMAGE_FAIL:
      return { loading: false, payload: null, error: action.error };
    default:
      return state;
  }
};

export { imageReducer, imagesReducer };
