import axios from 'axios';
import { encodeAll } from '../services/transactions';

const NAMESPACE = '5f4d76';
const PREFIXES = {
  COLLECTION: '00',
  MOJI: '01',
  SIRE_LISTING: '02',
  OFFER: '03'
};

export const getUserMoji = address => {
  return axios.get(`/api/state/${address}`);
};

export const getAllMoji = () => {
  return axios.get(`/api/state?address=${NAMESPACE + PREFIXES.MOJI}`);
};

export const postCollection = privateKey => {
  const batchList = encodeAll(privateKey, { action: 'CREATE_COLLECTION' });
  return axios({
    method: 'post',
    url: '/api/batches',
    headers: {
      'Content-Type': 'application/octet-stream'
    },
    data: batchList
  });
};
