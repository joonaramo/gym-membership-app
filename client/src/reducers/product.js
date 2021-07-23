const initialState = {
  product: {},
  loading: true,
  products: [],
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_PRODUCT':
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case 'GET_PRODUCTS':
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case 'CREATE_PRODUCT':
      return {
        ...state,
        loading: false,
        products: [payload, ...state.products],
      };
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p.id !== payload),
      };
    default:
      return state;
  }
};

export default productReducer;
