import { categoryConstants } from "../constants";

const initialState = {
  loading: false,
  items: [],
  item: [],
};

export function categories(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case categoryConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.categories,
        success: true,
      };
    case categoryConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
