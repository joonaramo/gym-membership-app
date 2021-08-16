import axios from 'axios';
import { API_URL } from '../utils/constants';

const get = async (categoryId) => {
  const { data } = await axios.get(`${API_URL}/categories/${categoryId}`);
  return data;
};

const getAll = async (page, limit) => {
  const { data } = await axios.get(`${API_URL}/categories`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

const update = async (categoryId, categoryData) => {
  const { data } = await axios.put(
    `${API_URL}/categories/${categoryId}`,
    categoryData
  );
  return data;
};

const create = async (categoryData) => {
  const { data } = await axios.post(`${API_URL}/categories`, categoryData);
  return data;
};

const remove = async (categoryId) => {
  await axios.delete(`${API_URL}/categories/${categoryId}`);
};

const categoriesService = {
  get,
  getAll,
  update,
  create,
  remove,
};

export default categoriesService;
