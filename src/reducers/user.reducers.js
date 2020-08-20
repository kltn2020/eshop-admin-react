import { userConstants } from "../constants";
import setAuthToken from "../store/setAuthToken";
import { parseJwt } from "../store";

const initialState = {
  token: localStorage.getItem("token"),
  loading: false,
  items: [],
  item: null,
  success: null,
  error: null,
};

export function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case userConstants.LOGIN_SUCCESS:
      localStorage.setItem("token", action.data.token);
      setAuthToken(localStorage.getItem("token"));
      return {
        ...state,
        loading: false,
        success: true,
        token: localStorage.getItem("token"),
        userRole: parseJwt(action.data.token).role,
      };
    case userConstants.LOGIN_FAILURE:
      localStorage.removeItem("token");
      return { ...state, loading: false, error: action.error };

    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case userConstants.REGISTER_SUCCESS:
      localStorage.setItem("token", action.data.token);
      setAuthToken(localStorage.getItem("token"));
      return {
        ...state,
        loading: false,
        success: true,
      };
    case userConstants.REGISTER_FAILURE:
      return { ...state, loading: false, error: action.error };

    case userConstants.LOGOUT:
      localStorage.removeItem("token");
      setAuthToken(null);
      return {
        ...state,
        token: null,
        user: null,
      };

    case userConstants.GETME_REQUEST:
      localStorage.getItem("token");
      return {
        ...state,
        loading: true,
      };
    case userConstants.GETME_SUCCESS:
      localStorage.getItem("token");
      return {
        ...state,
        loading: false,

        user: action.user,
      };
    case userConstants.GETME_FAILURE:
      return { ...state, error: action.error };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        // items: state.items.map((user) =>
        //   user.id === action.id ? { ...user, deleting: true } : user
        // ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        // items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        // items: state.items.map((user) => {
        //   if (user.id === action.id) {
        //     // make copy of user without 'deleting:true' property
        //     const { deleting, ...userCopy } = user;
        //     // return copy of user with 'deleteError:[error]' property
        //     return { ...userCopy, deleteError: action.error };
        //   }

        //   return user;
        // }),
      };

    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.user,
      };
    case userConstants.UPDATE_FAILURE:
      return { ...state, loading: false, error: action.error };

    case userConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case userConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        item: action.user,
      };
    case userConstants.GETBYID_ERROR:
      return { ...state, error: action.error };

    case userConstants.ADD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case userConstants.ADD_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    //Get all
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.users.results,
        next: action.users.next,
        previous: action.users.previous,
      };
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    //Non-pagination
    //Get all
    case userConstants.GETALL_NONPAGINATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case userConstants.GETALL_NONPAGINATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        items: action.users,
        next: action.users.next,
        previous: action.users.previous,
      };
    case userConstants.GETALL_NONPAGINATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
