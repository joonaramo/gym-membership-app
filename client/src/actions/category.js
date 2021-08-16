import categoriesService from '../services/categories';
import { setNotification } from './notification';

export const getCategories = (page, limit) => async (dispatch) => {
  try {
    const categories = await categoriesService.getAll(page, limit);
    dispatch({
      type: 'GET_CATEGORIES',
      payload: categories,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    const categories = await categoriesService.getAll();
    dispatch({
      type: 'GET_ALL_CATEGORIES',
      payload: categories,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const getCategory = (categoryId) => async (dispatch) => {
  try {
    const category = await categoriesService.get(categoryId);
    dispatch({
      type: 'GET_CATEGORY',
      payload: category,
    });
  } catch (err) {
    dispatch({
      type: 'GET_CATEGORY_FAILED',
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const updateCategory =
  (categoryId, categoryData) => async (dispatch) => {
    try {
      const updatedCategory = await categoriesService.update(
        categoryId,
        categoryData
      );
      dispatch({
        type: 'UPDATE_CATEGORY',
        payload: updatedCategory,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
      }
    }
  };

export const createCategory =
  (categoryData, setCreating) => async (dispatch) => {
    try {
      const category = await categoriesService.create(categoryData);
      dispatch({
        type: 'CREATE_CATEGORY',
        payload: category,
      });
      setCreating(false);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
      }
    }
  };

export const removeCategory = (categoryId) => async (dispatch) => {
  try {
    await categoriesService.remove(categoryId);
    dispatch({
      type: 'REMOVE_CATEGORY',
      payload: categoryId,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};
