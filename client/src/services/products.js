import axios from 'axios';
import { API_URL } from '../utils/constants';

const get = async (productId) => {
  const { data } = await axios.get(`${API_URL}/products/${productId}`);
  return data;
};

const getAll = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

const update = async (productId, productData) => {
  const { data } = await axios.put(
    `${API_URL}/products/${productId}`,
    productData
  );
  return data;
};

const productsService = {
  get,
  getAll,
  update,
};

export default productsService;
