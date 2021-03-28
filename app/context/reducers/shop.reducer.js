import { SHOP_FAIL, SHOP_REQUEST, SHOP_SUCCESS } from '../../constants/action';

const shopReducer = (state, action) => {
  switch (action.type) {
    case SHOP_REQUEST:
      return { loading: true, payload: null, error: null };
    case SHOP_SUCCESS:
      return { loading: false, payload: action.payload, error: null };
    case SHOP_FAIL:
      return { loading: false, payload: null, error: action.error };
    default:
      return state;
  }
};

export { shopReducer };
