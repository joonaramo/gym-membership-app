const initialState = {
  coupon: {},
  loading: true,
  coupons: [],
};

const couponReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_COUPON':
      return {
        ...state,
        loading: false,
        coupon: payload,
      };
    case 'GET_COUPONS':
      return {
        ...state,
        loading: false,
        coupons: payload,
      };
    case 'UPDATE_COUPON':
      return {
        ...state,
        loading: false,
        coupon: payload,
      };
    case 'CREATE_COUPON':
      return {
        ...state,
        loading: false,
        coupons: [payload, ...state.coupons],
      };
    case 'REMOVE_COUPON':
      return {
        ...state,
        loading: false,
        coupons: state.coupons.filter((p) => p.id !== payload),
      };
    default:
      return state;
  }
};

export default couponReducer;
