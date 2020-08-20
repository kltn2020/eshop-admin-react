import { brandConstants } from "../constants";

const initialState = {
  loading: false,
  items: [],
  item: [],
};

export function brands(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case brandConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case brandConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.brands,
        success: true,
      };
    case brandConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
