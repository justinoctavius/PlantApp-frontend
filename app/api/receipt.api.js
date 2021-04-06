import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { env } from '../config';
import { SESSION } from '../constants';

const receiptApi = {};

receiptApi.get = async (receipt_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/receipt/${receipt_id}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });
  return data.data;
};

receiptApi.getAll = async (shop_id, page) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(
    `${env.BACKEND_API}/receipts/${shop_id}/?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    }
  );
  return data.data;
};

export default receiptApi;
