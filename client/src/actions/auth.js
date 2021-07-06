import { setAuthToken } from '../utils/helpers';
import loginService from '../services/login';
import axios from 'axios';
import { API_URL } from '../utils/constants';

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
      const { token } = await loginService.login(body);
      console.log(token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: token,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err?.response?.data.errors;
      if (errors) {
        errors.forEach((error) => console.log(error.msg, 'error'));
      }
      dispatch({
        type: 'LOGIN_FAIL',
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
};
