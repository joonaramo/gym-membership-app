import axios from 'axios';
import { API_URL } from '../utils/constants';

const get = async (code) => {
  const { data } = await axios.get(`${API_URL}/coupons/${code}`);
  return data;
};

const couponsService = {
  get,
};

export default couponsService;
