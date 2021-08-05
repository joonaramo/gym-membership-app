const initialState = {
  user: {},
  loading: true,
  users: [],
  totalDocs: 0,
  limit: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
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
        loading: false,
        users: payload.docs,
        totalDocs: payload.totalDocs,
        limit: payload.limit,
        pagingCounter: payload.pagingCounter,
        hasPrevPage: payload.hasPrevPage,
        hasNextPage: payload.hasNextPage,
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
