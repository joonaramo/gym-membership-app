import axios from 'axios';
import { API_URL } from '../utils/constants';

const get = async (checkoutId) => {
  const { data } = await axios.get(`${API_URL}/klarna/${checkoutId}`);
  return data;
};

const create = async (productData) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post(
    `${API_URL}/klarna`,
    productData,
    axiosConfig
  );
  return data;
};

const confirm = async (checkoutId) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post(
    `${API_URL}/klarna/confirm/${checkoutId}`,
    {},
    axiosConfig
  );
  return data;
};

const capture = async (checkoutId, captureData) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post(
    `${API_URL}/klarna/capture/${checkoutId}`,
    captureData,
    axiosConfig
  );
  return data;
};

const klarnaService = {
  get,
  create,
  confirm,
  capture,
};

export default klarnaService;
