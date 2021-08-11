export const setNotification = (message, type, timeout) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      });
    }, timeout);
    dispatch({
      type: 'CREATE_NOTIFICATION',
      payload: { message, type, timeoutId },
    });
  };
};
