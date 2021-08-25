const initialState = {
  coupon: { loading: true },
  loading: true,
  coupons: [],
  allCoupons: [],
  totalDocs: 0,
  limit: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
}

const couponReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_COUPON':
      return {
        ...state,
        loading: false,
        coupon: payload,
      }
    case 'GET_COUPON_FAILED':
      return {
        ...state,
        coupon: { loading: false, failed: true },
      }
    case 'GET_COUPONS':
      return {
        ...state,
        loading: false,
        coupons: payload.docs,
        totalDocs: payload.totalDocs,
        limit: payload.limit,
        pagingCounter: payload.pagingCounter,
        hasPrevPage: payload.hasPrevPage,
        hasNextPage: payload.hasNextPage,
      }
    case 'GET_ALL_COUPONS':
      return {
        ...state,
        allCoupons: payload,
      }
    case 'UPDATE_COUPON':
      return {
        ...state,
        loading: false,
        coupon: payload,
      }
    case 'CREATE_COUPON':
      return {
        ...state,
        loading: false,
        coupons: [payload, ...state.coupons],
      }
    case 'REMOVE_COUPON':
      return {
        ...state,
        loading: false,
        coupons: state.coupons.filter((p) => p.id !== payload),
      }
    default:
      return state
  }
}

export default couponReducer
