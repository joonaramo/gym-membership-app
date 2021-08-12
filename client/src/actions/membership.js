import membershipsService from '../services/memberships';
import { setNotification } from './notification';

export const getMemberships = (page, limit) => async (dispatch) => {
  try {
    const memberships = await membershipsService.getAll(page, limit);
    dispatch({
      type: 'GET_MEMBERSHIPS',
      payload: memberships,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const getMembership = (membershipId) => async (dispatch) => {
  try {
    const membership = await membershipsService.get(membershipId);
    dispatch({
      type: 'GET_MEMBERSHIP',
      payload: membership,
    });
  } catch (err) {
    dispatch({
      type: 'GET_MEMBERSHIP_FAILED',
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const updateMembership =
  (membershipId, membershipData) => async (dispatch) => {
    try {
      const updatedMembership = await membershipsService.update(
        membershipId,
        membershipData
      );
      dispatch({
        type: 'UPDATE_MEMBERSHIP',
        payload: updatedMembership,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
      }
    }
  };

export const createMembership = (membershipData) => async (dispatch) => {
  try {
    const membership = await membershipsService.create(membershipData);
    dispatch({
      type: 'CREATE_MEMBERSHIP',
      payload: membership,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};

export const removeMembership = (membershipId) => async (dispatch) => {
  try {
    await membershipsService.remove(membershipId);
    dispatch({
      type: 'REMOVE_MEMBERSHIP',
      payload: membershipId,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)));
    }
  }
};
