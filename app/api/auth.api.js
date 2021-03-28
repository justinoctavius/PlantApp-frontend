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
  return data.data;
};

authApi.signUp = async (username, password, email) => {
  const data = await axios.post(`${env.BACKEND_API}/signup`, {
    username,
    password,
    email,
  });
  return data.data;
};

authApi.signOut = async () => {
  await AsyncStorage.removeItem(SESSION);
  return { msg: 'success', payload: null, status: 200 };
};

authApi.restoreSession = async () => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/user`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

export default authApi;
