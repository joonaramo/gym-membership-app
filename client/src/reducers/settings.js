const initialState = {
  loading: true,
  settings: undefined,
};

const settingsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_SETTINGS':
    case 'GET_SETTINGS_FAILED':
      return {
        ...state,
        loading: false,
        settings: payload,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        loading: false,
        settings: payload,
      };
    case 'CREATE_SETTINGS':
      return {
        ...state,
        loading: false,
        settings: payload,
      };
    case 'REMOVE_SETTINGS':
      return {
        ...state,
        loading: false,
        settings: {},
      };
    default:
      return state;
  }
};

export default settingsReducer;
