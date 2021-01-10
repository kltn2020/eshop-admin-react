import { combineReducers } from "redux";
import { users } from "./user.reducers";
import { products } from "./product.reducers";
import { categories } from "./category.reducers";
import { brands } from "./brand.reducers";
import { vouchers } from "./voucher.reducers";
import { orders } from "./order.reducers";
import { reviews } from "./review.reducers";

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
  theme,
  users,
  products,
  categories,
  brands,
  vouchers,
  orders,
  reviews,
});

export default rootReducer;
