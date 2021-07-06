import axios from 'axios';
import { API_URL } from '../utils/constants';

const login = async (credentials) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post(
    `${API_URL}/auth/login`,
    credentials,
    axiosConfig
  );
  return data;
};

export default { login };
