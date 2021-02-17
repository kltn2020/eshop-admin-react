import { settingConstants } from "../constants";

const initialState = {
  loading: false,
  item: [],
  success: null,
  error: null,
};

export function settings(state = initialState, action) {
  switch (action.type) {
    // Get Reducers
    case settingConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case settingConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.setting,
      };
    case settingConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    //Update reducers
    case settingConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case settingConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.setting,
      };
    case settingConstants.UPDATE_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}
