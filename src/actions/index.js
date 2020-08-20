//Theme
import { themeConstants } from "../constants";

export * from "./user.actions";
export * from "./category.actions";
export * from "./product.actions";
export * from "./brand.actions";

//Theme
export const themeActions = {
  changeDarkTheme,
};

function changeDarkTheme(toggle) {
  return (dispatch) => {
    dispatch({ type: themeConstants.CHANGE_THEME, toggle });
  };
}
