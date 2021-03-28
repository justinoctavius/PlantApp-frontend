import { authApi } from '../../api';
import { dispatchAction } from './dispatch';

export const signInAction = (username, password) => async (dispatch) => {
  const query = async () => await authApi.signIn(username, password);
  await dispatchAction(dispatch, query);
};

export const signUpAction = (username, password, email) => async (dispatch) => {
  const query = async () => await authApi.signUp(username, password, email);
  await dispatchAction(dispatch, query);
};

export const signOutAction = () => async (dispatch) => {
  const query = async () => await authApi.signOut();
  await dispatchAction(dispatch, query);
};

export const restoreSessionAction = () => async (dispatch) => {
  const query = async () => await authApi.restoreSession();
  await dispatchAction(dispatch, query);
};
