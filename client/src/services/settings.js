import axios from 'axios';
import { API_URL } from '../utils/constants';

const get = async () => {
  const { data } = await axios.get(`${API_URL}/settings`);
  return data;
};

const update = async (settingsData) => {
  const { data } = await axios.put(`${API_URL}/settings`, settingsData);
  return data;
};

const create = async (settingsData) => {
  const { data } = await axios.post(`${API_URL}/settings`, settingsData);
  return data;
};

const remove = async () => {
  await axios.delete(`${API_URL}/settings`);
};

const settingsService = {
  get,
  update,
  create,
  remove,
};

export default settingsService;
