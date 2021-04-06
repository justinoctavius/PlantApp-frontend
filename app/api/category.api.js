import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { env } from '../config';
import { SESSION } from '../constants';

const categoryApi = {};

categoryApi.getAll = async (shop_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/categories/${shop_id}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

categoryApi.add = async (shop_id, name, description, image_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));

  const data = await fetch(`${env.BACKEND_API}/category`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shop_id, name, description, image_id }),
  }).then((res) => res.json());
  return data;
};

categoryApi.update = async (category_id, name, description, image_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));

  const data = await fetch(`${env.BACKEND_API}/category/${category_id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description, image_id }),
  }).then((res) => res.json());
  return data;
};

categoryApi.delete = async (category_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.delete(
    `${env.BACKEND_API}/category/${category_id}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  return data.data;
};

categoryApi.get = async (category_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/category/${category_id}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return data.data;
};

export default categoryApi;
