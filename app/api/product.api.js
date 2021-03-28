import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { env } from '../config';
import { SESSION } from '../constants';

const productApi = {};

productApi.getAll = async (category_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/product/${category_id}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

productApi.add = async (category_id, product) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await fetch(`${env.BACKEND_API}/product`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category_id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      image_id: product.image_id,
    }),
  }).then((res) => res.json());
  return data;
};

productApi.get = async (product_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/one-product/${product_id}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return data.data;
};

productApi.update = async (product_id, product) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await fetch(`${env.BACKEND_API}/product/${product_id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      image_id: product.image_id,
    }),
  }).then((res) => res.json());
  return data;
};

productApi.delete = async (product_id) => {
  console.log(product_id);
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.delete(`${env.BACKEND_API}/product/${product_id}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return data.data;
};

export default productApi;
