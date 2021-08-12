import axios from 'axios';
import { API_URL } from '../utils/constants';

const get = async (orderId) => {
  const { data } = await axios.get(`${API_URL}/orders/${orderId}`);
  return data;
};

const getAll = async (page, limit, status) => {
  const { data } = await axios.get(`${API_URL}/orders`, {
    params: {
      page,
      limit,
      status,
    },
  });
  return data;
};

const update = async (orderId, orderData) => {
  const { data } = await axios.put(`${API_URL}/orders/${orderId}`, orderData);
  return data;
};

const create = async (orderData) => {
  const { data } = await axios.post(`${API_URL}/orders`, orderData);
  return data;
};

const remove = async (orderId) => {
  await axios.delete(`${API_URL}/orders/${orderId}`);
};

const ordersService = {
  get,
  getAll,
  update,
  create,
  remove,
};

export default ordersService;
