import couponsService from '../services/coupons'
import { setNotification } from './notification'

export const getCoupons = (page, limit) => async (dispatch) => {
  try {
    const coupons = await couponsService.getAll(page, limit)
    dispatch({
      type: 'GET_COUPONS',
      payload: coupons,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const getAllCoupons = () => async (dispatch) => {
  try {
    const coupons = await couponsService.getAll()
    dispatch({
      type: 'GET_ALL_COUPONS',
      payload: coupons,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const getCoupon = (couponId) => async (dispatch) => {
  try {
    const coupon = await couponsService.get(couponId)
    dispatch({
      type: 'GET_COUPON',
      payload: coupon,
    })
  } catch (err) {
    dispatch({
      type: 'GET_COUPON_FAILED',
    })
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const updateCoupon = (couponId, couponData) => async (dispatch) => {
  try {
    const updatedCoupon = await couponsService.update(couponId, couponData)
    dispatch({
      type: 'UPDATE_COUPON',
      payload: updatedCoupon,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const createCoupon = (couponData, setCreating) => async (dispatch) => {
  try {
    const coupon = await couponsService.create(couponData)
    dispatch({
      type: 'CREATE_COUPON',
      payload: coupon,
    })
    setCreating(false)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const removeCoupon = (couponId) => async (dispatch) => {
  try {
    await couponsService.remove(couponId)
    dispatch({
      type: 'REMOVE_COUPON',
      payload: couponId,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}
