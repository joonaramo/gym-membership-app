const initialState = {
  category: { loading: true },
  loading: true,
  categories: [],
  allCategories: [],
  totalDocs: 0,
  limit: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
};

const categoryReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_CATEGORY':
      return {
        ...state,
        loading: false,
        category: payload,
      };
    case 'GET_CATEGORY_FAILED':
      return {
        ...state,
        category: { loading: false, failed: true },
      };
    case 'GET_CATEGORIES':
      return {
        ...state,
        loading: false,
        categories: payload.docs,
        totalDocs: payload.totalDocs,
        limit: payload.limit,
        pagingCounter: payload.pagingCounter,
        hasPrevPage: payload.hasPrevPage,
        hasNextPage: payload.hasNextPage,
      };
    case 'GET_ALL_CATEGORIES':
      return {
        ...state,
        allCategories: payload,
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        loading: false,
        category: payload,
      };
    case 'CREATE_CATEGORY':
      return {
        ...state,
        loading: false,
        categories: [payload, ...state.categories],
      };
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        loading: false,
        categories: state.categories.filter((p) => p.id !== payload),
      };
    default:
      return state;
  }
};

export default categoryReducer;
