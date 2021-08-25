const initialState = {
  product: {
    loading: true,
  },
  loading: true,
  products: [],
  allProducts: [],
  totalDocs: 0,
  limit: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
}

const productReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'GET_PRODUCT':
      return {
        ...state,
        loading: false,
        product: payload,
      }
    case 'GET_PRODUCT_FAILED':
      return {
        ...state,
        product: { loading: false, failed: true },
      }
    case 'GET_PRODUCTS':
      return {
        ...state,
        loading: false,
        products: payload.docs,
        totalDocs: payload.totalDocs,
        limit: payload.limit,
        pagingCounter: payload.pagingCounter,
        hasPrevPage: payload.hasPrevPage,
        hasNextPage: payload.hasNextPage,
      }
    case 'GET_ALL_PRODUCTS':
      return {
        ...state,
        allProducts: payload,
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        loading: false,
        product: payload,
      }
    case 'CREATE_PRODUCT':
      return {
        ...state,
        loading: false,
        products: [payload, ...state.products],
      }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        loading: false,
        products: state.products.filter((p) => p.id !== payload),
      }
    default:
      return state
  }
}

export default productReducer
