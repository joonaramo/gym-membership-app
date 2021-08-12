import ordersService from '../services/orders';
import { setNotification } from './notification';

export const getOrders = (page, limit, status) => async (dispatch) => {
  try {
    const orders = await ordersService.getAll(page, limit, status);
    dispatch({
      type: 'GET_ORDERS',
      payload: orders,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const getOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: 'SET_ORDER_LOADING',
    });
    const order = await ordersService.get(orderId);
    dispatch({
      type: 'GET_ORDER',
      payload: order,
    });
  } catch (err) {
    dispatch({
      type: 'GET_ORDER_FAILED',
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const updateOrder = (orderId, orderData) => async (dispatch) => {
  try {
    const updatedOrder = await ordersService.update(orderId, orderData);
    dispatch({
      type: 'UPDATE_ORDER',
      payload: updatedOrder,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const createOrder = (orderData) => async (dispatch) => {
  try {
    const order = await ordersService.create(orderData);
    dispatch({
      type: 'CREATE_ORDER',
      payload: order,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const removeOrder = (orderId, history) => async (dispatch) => {
  try {
    await ordersService.remove(orderId);
    dispatch({
      type: 'REMOVE_ORDER',
      payload: orderId,
    });
    history.push('/admin/orders');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};
