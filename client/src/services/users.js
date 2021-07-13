import axios from 'axios';
import { API_URL } from '../utils/constants';

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

export default { update };
