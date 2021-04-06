import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { env } from '../config';
import { SESSION } from '../constants';

const shopApi = {};

shopApi.get = async (shop_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/shop/${shop_id}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

shopApi.getAll = async (page) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/shops/?page=${page}`, {
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

shopApi.update = async (shop_id, name, description) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const body = JSON.stringify({
    name,
    description,
  });
  const data = await fetch(`${env.BACKEND_API}/shop/${shop_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
    },
    body,
  }).then((res) => res.json());
  return data;
};

shopApi.buyProduct = async (
  buyer_shop_id,
  seller_shop_id,
  product_id,
  quantity
) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const body = JSON.stringify({
    buyer_shop_id,
    seller_shop_id,
    product_id,
    quantity,
  });
  const data = await fetch(`${env.BACKEND_API}/buy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.token}`,
    },
    body,
  }).then((res) => res.json());
  return data;
};

export default shopApi;
