import { FAIL, REQUEST, SUCCESS } from '../../constants/action';

const dispatchAction = async (dispatch, query) => {
  dispatch({ type: REQUEST, payload: null, error: null });
  try {
    const data = await query();
    const { msg, payload, status } = data;
    if (status === 200 || msg === 'success') {
      dispatch({ type: SUCCESS, payload, error: null });
    } else {
      dispatch({ type: FAIL, payload: null, error: msg });
    }
  } catch (error) {
    dispatch({
      type: FAIL,
      payload: null,
      error: 'Ups error has ocurred',
    });
  }
};

export { dispatchAction };
