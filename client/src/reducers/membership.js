const initialState = {
  membership: { loading: true },
  loading: true,
  memberships: [],
  totalDocs: 0,
  limit: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
};

const membershipReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_MEMBERSHIP':
      return {
        ...state,
        loading: false,
        membership: payload,
      };
    case 'GET_MEMBERSHIP_FAILED':
      return {
        ...state,
        membership: { loading: false, failed: true },
      };
    case 'GET_MEMBERSHIPS':
      return {
        ...state,
        loading: false,
        memberships: payload.docs ? payload.docs : payload,
        totalDocs: payload.totalDocs,
        limit: payload.limit,
        pagingCounter: payload.pagingCounter,
        hasPrevPage: payload.hasPrevPage,
        hasNextPage: payload.hasNextPage,
      };
    case 'UPDATE_MEMBERSHIP':
      return {
        ...state,
        loading: false,
        membership: payload,
      };
    case 'CREATE_MEMBERSHIP':
      return {
        ...state,
        loading: false,
        memberships: [payload, ...state.memberships],
      };
    case 'REMOVE_MEMBERSHIP':
      return {
        ...state,
        loading: false,
        memberships: state.memberships.filter((p) => p.id !== payload),
      };
    default:
      return state;
  }
};

export default membershipReducer;
