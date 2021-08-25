export const setNotification = (message, timeout, type) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      })
    }, timeout)
    dispatch({
      type: 'CREATE_NOTIFICATION',
      payload: { message, type, timeoutId },
    })
  }
}
