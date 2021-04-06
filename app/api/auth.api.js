import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { env } from '../config';
import { SESSION } from '../constants';

const authApi = {};

authApi.signIn = async (username, password) => {
  const data = await axios.post(`${env.BACKEND_API}/signin`, {
    username,
    email: '',
    password,
  });
  const { payload, status } = data.data;
  if (status === 200) {
    await AsyncStorage.setItem(
      SESSION,
      JSON.stringify({ token: payload?.token, user_id: payload?.user?.user_id })
    );
  }
  const { msg } = data.data;
  return { msg, payload: payload?.user, status };
};

authApi.signUp = async (username, password, email) => {
  const data = await axios.post(`${env.BACKEND_API}/signup`, {
    username,
    password,
    email,
  });
  const { payload, status } = data.data;
  if (status === 200) {
    await AsyncStorage.setItem(
      SESSION,
      JSON.stringify({ token: payload.token, user_id: payload.user.user_id })
    );
  }
  const { msg } = data.data;
  return { msg, payload: payload?.user, status };
};

authApi.signOut = async () => {
  await AsyncStorage.removeItem(SESSION);
  return { msg: 'success', payload: null, status: 200 };
};

authApi.restoreSession = async () => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  if (session.token) {
    const data = await axios.get(`${env.BACKEND_API}/user`, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    return data.data;
  }
};

export default authApi;
