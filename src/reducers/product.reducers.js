import { productConstants } from "../constants";

const initialState = {
  loading: true,
  items: [],
  item: [],
};

export function products(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case productConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case productConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.products.entries,
        totalItems: action.products.total_entries,
        totalPage: action.products.total_pages,
      };
    case productConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    //Non pagination
    // Get Reducers
    case productConstants.GETALL_NONPAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case productConstants.GETALL_NONPAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.products,
        count: action.products.count,
        next: action.products.next,
        previous: action.products.previous,
      };
    case productConstants.GETALL_NONPAGINATION_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case productConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case productConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.products,
      };
    case productConstants.GETBYID_ERROR:
      return { ...state, loading: false, error: action.error };

    //Add reducers
    case productConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case productConstants.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: [],
      };
    case productConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case productConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case productConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
        loading: false,
        success: true,
      };
    case productConstants.UPDATE_FAILURE:
      return { ...state, loading: false, error: action.error };

    //Delete reducers
    case productConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((product) =>
          product.id === action.id ? { ...product, deleting: true } : product
        ),
      };
    case productConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: state.items.filter((product) => product.id !== action.id),
      };
    case productConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((product) => {
          if (product.id === action.id) {
            const { deleting, ...productCopy } = product;
            return { ...productCopy, deleteError: action.error };
          }

          return product;
        }),
      };

    default:
      return state;
  }
}
