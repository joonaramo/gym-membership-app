const initialState = {
  order: { loading: true },
  loading: true,
  orders: [],
  allOrders: [],
  totalDocs: 0,
  limit: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
};

const orderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ORDER_LOADING':
      return {
        ...state,
        order: { loading: true },
      };
    case 'GET_ORDER':
      return {
        ...state,
        order: { ...payload, loading: false },
      };
    case 'GET_ORDER_FAILED':
      return {
        ...state,
        order: { loading: false, failed: true },
      };
    case 'GET_ORDERS':
      return {
        ...state,
        loading: false,
        orders: payload.docs ? payload.docs : payload,
        totalDocs: payload.totalDocs,
        limit: payload.limit,
        pagingCounter: payload.pagingCounter,
        hasPrevPage: payload.hasPrevPage,
        hasNextPage: payload.hasNextPage,
      };
    case 'GET_ALL_ORDERS':
      return {
        ...state,
        allOrders: payload,
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
