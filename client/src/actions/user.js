import usersService from '../services/users';
import { setNotification } from './notification';

export const getUser = (userId) => async (dispatch) => {
  try {
    const user = await usersService.get(userId);
    dispatch({
      type: 'GET_USER',
      payload: user,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const getUsers = (page, limit) => async (dispatch) => {
  try {
    const users = await usersService.getAll(page, limit);
    dispatch({
      type: 'GET_USERS',
      payload: users,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const user = await usersService.update(id, userData);
    dispatch({
      type: 'UPDATE_SINGLE_USER',
      payload: user,
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setNotification(error, 3000));
    }
  }
};
