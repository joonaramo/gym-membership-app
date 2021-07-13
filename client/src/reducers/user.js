const initialState = {
  user: {
    birth_date: undefined,
    city: undefined,
    email: undefined,
    first_name: undefined,
    id: undefined,
    is_admin: false,
    last_name: undefined,
    memberships: [],
    orders: [],
    phone_number: undefined,
    postal_code: null,
    street_address: undefined,
  },
  loading: true,
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
    default:
      return state;
  }
};

export default userReducer;
