import settingsService from '../services/settings'
import { setNotification } from './notification'

export const getSettings = () => async (dispatch) => {
  try {
    const settings = await settingsService.get()
    dispatch({
      type: 'GET_SETTINGS',
      payload: settings,
    })
  } catch (err) {
    dispatch({
      type: 'GET_SETTINGS_FAILED',
      payload: undefined,
    })
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const updateSettings = (settingsData) => async (dispatch) => {
  try {
    const updatedSettings = await settingsService.update(settingsData)
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: updatedSettings,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const createSettings = (settingsData) => async (dispatch) => {
  try {
    const settings = await settingsService.create(settingsData)
    dispatch({
      type: 'CREATE_SETTINGS',
      payload: settings,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}

export const removeSettings = () => async (dispatch) => {
  try {
    await settingsService.remove()
    dispatch({
      type: 'REMOVE_SETTINGS',
      payload: null,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setNotification(error.msg, 3000)))
    }
  }
}
