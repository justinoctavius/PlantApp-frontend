import { AUTH_FAIL, AUTH_REQUEST, AUTH_SUCCESS } from '../../constants/action';

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return { loading: true, payload: null, error: null };
    case AUTH_SUCCESS:
      return { loading: false, payload: action.payload, error: null };
    case AUTH_FAIL:
      return { loading: false, payload: null, error: action.error };
    default:
      return state;
  }
};

export { authReducer };
