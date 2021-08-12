const initialState = {
  user: { loading: true },
  loading: true,
  users: [],
  allUsers: [],
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
    case 'GET_USER_FAILED':
      return {
        ...state,
        user: { loading: false, failed: true },
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
    case 'GET_ALL_USERS':
      return {
        ...state,
        allUsers: payload,
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
