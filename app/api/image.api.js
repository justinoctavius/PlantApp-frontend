import AsyncStorage from '@react-native-async-storage/async-storage';
import { env } from '../config';
import axios from 'react-native-axios';
import { SESSION } from '../constants';
const imageApi = {};

imageApi.getAll = async () => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/image`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

imageApi.add = async (image, name, description) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const filename = image.uri.split('/').pop();
  const body = new FormData();
  body.append('image', {
    uri: image.uri,
    name: filename,
    type: `${image.type}/${filename.split('.').pop()}`,
  });
  body.append('name', name);
  body.append('description', description);
  const data = await fetch(`${env.BACKEND_API}/image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-type': 'multipart/form-data',
    },
    body,
  }).then((res) => res.json());
  return data;
};

imageApi.get = async (image_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.get(`${env.BACKEND_API}/image/${image_id}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

imageApi.delete = async (image_id) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const data = await axios.delete(`${env.BACKEND_API}/image/${image_id}`, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
  return data.data;
};

imageApi.update = async (oldImage_url, image_id, name, description, image) => {
  const session = JSON.parse(await AsyncStorage.getItem(SESSION));
  const body = new FormData();
  if (image) {
    const filename = image.uri.split('/').pop();
    const ext = filename.split('.').pop();
    body.append('image', {
      uri: image.uri,
      name: filename,
      type: `${image.type}/${ext}`,
    });
  } else {
    body.append('image', null);
  }
  body.append('name', name);
  body.append('description', description);
  body.append('oldImage_url', oldImage_url);
  const data = await fetch(`${env.BACKEND_API}/image/${image_id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${session.token}`,
      'Content-type': 'multipart/form-data',
    },
    body,
  }).then((res) => res.json());
  return data;
};

export default imageApi;
