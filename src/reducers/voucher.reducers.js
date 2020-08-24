import { voucherConstants } from "../constants";

const initialState = {
  loading: false,
  items: [],
  item: null,
};

export function vouchers(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case voucherConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case voucherConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.vouchers.entries,
        totalItems: action.vouchers.total_entries,
        totalPage: action.vouchers.total_pages,
      };
    case voucherConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    //Non pagination
    // Get Reducers
    case voucherConstants.GETALL_NONPAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case voucherConstants.GETALL_NONPAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.vouchers,
        count: action.vouchers.count,
        next: action.vouchers.next,
        previous: action.vouchers.previous,
      };
    case voucherConstants.GETALL_NONPAGINATION_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case voucherConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case voucherConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.vouchers,
      };
    case voucherConstants.GETBYID_ERROR:
      return { ...state, loading: false, error: action.error };

    //Add reducers
    case voucherConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case voucherConstants.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: [...state.items, action.voucher],
      };
    case voucherConstants.ADD_FAILURE:
      return { ...state, error: action.error, loading: false };

    //Update reducers
    case voucherConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case voucherConstants.UPDATE_SUCCESS:
      return {
        ...state,
        items: state.items.map((element) =>
          element.id === action.voucher.id
            ? { ...element, is_used: action.voucher.is_used }
            : element
        ),
        loading: false,
        success: true,
      };
    case voucherConstants.UPDATE_FAILURE:
      return { ...state, loading: false, error: action.error };

    //Delete reducers
    case voucherConstants.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
        items: state.items.map((voucher) =>
          voucher.id === action.id ? { ...voucher, deleting: true } : voucher
        ),
      };
    case voucherConstants.DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: state.items.filter((voucher) => !action.id.includes(voucher.id)),
      };
    case voucherConstants.DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        items: state.items.map((voucher) => {
          if (voucher.id === action.id) {
            const { deleting, ...voucherCopy } = voucher;
            return { ...voucherCopy, deleteError: action.error };
          }

          return voucher;
        }),
      };

    default:
      return state;
  }
}
