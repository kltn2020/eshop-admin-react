import { orderConstants } from "../constants";

const initialState = {
  loading: false,
  items: [],
  item: [],
  totalItems: 0,
};

export function orders(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case orderConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case orderConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.orders.entries,
        totalItems: action.orders.total_entries,
        totalPage: action.orders.total_pages,
      };
    case orderConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    //Non pagination
    // Get Reducers
    case orderConstants.GETALL_NONPAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case orderConstants.GETALL_NONPAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.orders,
        count: action.orders.count,
        next: action.orders.next,
        previous: action.orders.previous,
      };
    case orderConstants.GETALL_NONPAGINATION_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case orderConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case orderConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.orders,
      };
    case orderConstants.GETBYID_ERROR:
      return { ...state, loading: false, error: action.error };

    //Add reducers
    case orderConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case orderConstants.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: [],
      };
    case orderConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case orderConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case orderConstants.UPDATE_SUCCESS:
      return {
        ...state,
        item: [],
        loading: false,
        success: true,
      };
    case orderConstants.UPDATE_FAILURE:
      return { ...state, loading: false, error: action.error };

    //Delete reducers
    case orderConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((order) =>
          order.id === action.id ? { ...order, deleting: true } : order
        ),
      };
    case orderConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        totalItems: state.totalItems - 1,
        items: state.items.filter((order) => !action.id.includes(order.id)),
      };
    case orderConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((order) => {
          if (order.id === action.id) {
            const { deleting, ...orderCopy } = order;
            return { ...orderCopy, deleteError: action.error };
          }

          return order;
        }),
      };

    default:
      return state;
  }
}
