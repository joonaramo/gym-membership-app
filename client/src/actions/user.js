import usersService from '../services/users';
import { setNotification } from './notification';
import { format } from 'date-fns';

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

export const getUsers = () => async (dispatch) => {
  try {
    const users = await usersService.getAll();
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

export const updateUser =
  ({
    id,
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
      const user = await usersService.update(id, body);
      dispatch({
        type: 'UPDATE_SINGLE_USER',
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
