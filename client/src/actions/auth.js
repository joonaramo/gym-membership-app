import axios from 'axios';
import { API_URL } from '../utils/constants';
import { setAuthToken } from '../utils/helpers';
import { format } from 'date-fns';
import authService from '../services/auth';
import userService from '../services/users';
import { setNotification } from './notification';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const { data } = await axios.get(`${API_URL}/users/me`);
    dispatch({
      type: 'USER_LOADED',
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ email, password });
    try {
      const { token } = await authService.login(body);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: token,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err?.response?.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
      }
      dispatch({
        type: 'LOGIN_FAIL',
      });
    }
  };

export const signup =
  ({
    email,
    password,
    first_name,
    last_name,
    phone_number,
    street_address,
    postal_code,
    city,
    birth_date,
  }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      email,
      password,
      first_name,
      last_name,
      phone_number,
      street_address,
      postal_code,
      city,
      birth_date,
    });
    try {
      const { token } = await authService.signup(body);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: token,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
      }
      dispatch({
        type: 'REGISTER_FAIL',
      });
    }
  };

export const updateUser =
  ({
    email,
    first_name,
    last_name,
    phone_number,
    street_address,
    postal_code,
    city,
    birth_date,
  }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      phone_number,
      street_address,
      postal_code,
      city,
      birth_date: format(new Date(birth_date), 'yyyy-MM-dd'),
    });
    try {
      const user = await userService.update('me', body);
      dispatch({
        type: 'UPDATE_USER',
        payload: user,
      });
    } catch (err) {
      const error = err.response.data.error;
      if (error) {
        dispatch(setNotification(error, 3000));
      }
      throw new Error(error);
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};
