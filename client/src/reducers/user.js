const initialState = {
  user: {},
  loading: true,
  users: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_USER':
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case 'GET_USERS':
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case 'UPDATE_SINGLE_USER':
      return {
        ...state,
        user: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
