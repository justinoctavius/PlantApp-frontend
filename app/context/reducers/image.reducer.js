import { FAIL, REQUEST, SUCCESS } from '../../constants/action';

const imageReducer = (state, action) => {
  switch (action.type) {
    case REQUEST:
      return { loading: true, payload: null, error: null };
    case SUCCESS:
      return { loading: false, payload: action.payload, error: null };
    case FAIL:
      return { loading: false, payload: null, error: action.error };
    default:
      return state;
  }
};

const imagesReducer = (state, action) => {
  switch (action.type) {
    case REQUEST:
      return { loading: true, payload: null, error: null };
    case SUCCESS:
      return { loading: false, payload: action.payload, error: null };
    case FAIL:
      return { loading: false, payload: null, error: action.error };
    default:
      return state;
  }
};

export { imageReducer, imagesReducer };
