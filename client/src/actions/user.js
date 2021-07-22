import usersService from '../services/users';
import { setNotification } from './notification';

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
