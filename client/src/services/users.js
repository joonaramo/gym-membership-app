import axios from 'axios';
import { API_URL } from '../utils/constants';

const getAll = async () => {
  const { data } = await axios.get(`${API_URL}/users`);
  return data;
};

const update = async (userId, userData) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.patch(
    `${API_URL}/users/${userId}`,
    userData,
    axiosConfig
  );
  return data;
};

const usersService = {
  update,
  getAll,
};

export default usersService;
