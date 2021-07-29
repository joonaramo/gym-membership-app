const initialState = {
  membership: {},
  loading: true,
  memberships: [],
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
    case 'GET_MEMBERSHIPS':
      return {
        ...state,
        loading: false,
        memberships: payload,
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
