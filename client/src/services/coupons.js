import axios from 'axios';
import { API_URL } from '../utils/constants';

const getByCode = async (code) => {
  const { data } = await axios.get(`${API_URL}/coupons/code/${code}`);
  return data;
};

const get = async (couponId) => {
  const { data } = await axios.get(`${API_URL}/coupons/${couponId}`);
  return data;
};

const getAll = async () => {
  const { data } = await axios.get(`${API_URL}/coupons`);
  return data;
};

const update = async (couponId, couponData) => {
  const { data } = await axios.put(
    `${API_URL}/coupons/${couponId}`,
    couponData
  );
  return data;
};

const create = async (couponData) => {
  const { data } = await axios.post(`${API_URL}/coupons`, couponData);
  return data;
};

const remove = async (couponId) => {
  await axios.delete(`${API_URL}/coupons/${couponId}`);
};

const couponsService = {
  getByCode,
  get,
  getAll,
  update,
  create,
  remove,
};

export default couponsService;
