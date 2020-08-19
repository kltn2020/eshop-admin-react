//Theme
import { themeConstants } from "../constants";

export * from "./user.actions";

//Theme
export const themeActions = {
  changeDarkTheme,
};

function changeDarkTheme(toggle) {
  return (dispatch) => {
    dispatch({ type: themeConstants.CHANGE_THEME, toggle });
  };
}
