export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIFICATION',
      });
    }, timeout);
    dispatch({
      type: 'CREATE_NOTIFICATION',
      payload: { message, timeoutId },
    });
  };
};
