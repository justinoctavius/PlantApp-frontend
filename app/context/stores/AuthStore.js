import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { authReducer } from '../reducers';
import {
  signInAction,
  signOutAction,
  signUpAction,
  restoreSessionAction,
} from '../actions';

export const AuthContext = createContext();

const AuthStore = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {});

  const authActions = useMemo(
    () => ({
      signIn: async (username, password) => {
        await signInAction(username, password)(authDispatch);
      },
      signUp: async (username, email, password) => {
        await signUpAction(username, email, password)(authDispatch);
      },
      signOut: async () => {
        await signOutAction()(authDispatch);
      },
      restoreSession: async () => {
        await restoreSessionAction()(authDispatch);
        console.log(authState);
      },
    }),
    []
  );

  useEffect(() => {
    authActions.restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authActions }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthStore;
