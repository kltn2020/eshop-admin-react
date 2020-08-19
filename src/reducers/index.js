import { combineReducers } from "redux";
import { users } from "./user.reducers";

//Theme
import { themeConstants } from "../constants";

export function theme(state = { dark: false }, action) {
  switch (action.type) {
    // Get Reducers
    case themeConstants.CHANGE_THEME:
      return {
        dark: !action.toggle,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users,
  theme,
});

export default rootReducer;
