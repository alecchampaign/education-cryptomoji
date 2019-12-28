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

export const getAllMoji = address => {
  return axios.get(`/api/state/address=${NAMESPACE + PREFIXES.MOJI}`);
};
