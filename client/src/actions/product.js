import productsService from '../services/products';
import { setNotification } from './notification';

export const getProducts = () => async (dispatch) => {
  try {
    const products = await productsService.getAll();
    dispatch({
      type: 'GET_PRODUCTS',
      payload: products,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const getProduct = (productId) => async (dispatch) => {
  try {
    const product = await productsService.get(productId);
    dispatch({
      type: 'GET_PRODUCT',
      payload: product,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    const updatedProduct = await productsService.update(productId, productData);
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: updatedProduct,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};
