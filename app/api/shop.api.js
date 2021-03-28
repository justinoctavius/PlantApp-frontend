import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { env } from '../config';
import { SESSION } from '../constants';

const shopApi = {};

shopApi.get = async (shop_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/one-shop/${shop_id}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

shopApi.getAll = async (page) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/shop/${page}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

shopApi.getGlobal = async () => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/shop-global`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

export default shopApi;
