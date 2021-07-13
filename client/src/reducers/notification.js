const initialState = { message: '', timeoutId: null };

const notificationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CREATE_NOTIFICATION':
      if (state.timeoutId !== null) {
        clearTimeout(state.timeoutId);
      }
      return {
        message: payload.message,
        timeoutId: payload.timeoutId,
      };
    case 'DELETE_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
