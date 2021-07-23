const initialState = {
  order: {},
  loading: true,
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_ORDER':
      return {
        ...state,
        loading: false,
        order: payload,
      };
    case 'GET_ORDERS':
      return {
        ...state,
        loading: false,
        orders: payload,
      };
    case 'UPDATE_ORDER':
      return {
        ...state,
        loading: false,
        order: payload,
      };
    case 'CREATE_ORDER':
      return {
        ...state,
        loading: false,
        orders: [payload, ...state.orders],
      };
    case 'REMOVE_ORDER':
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((p) => p.id !== payload),
      };
    default:
      return state;
  }
};

export default orderReducer;
