export * from "./user.constants";
export * from "./category.constants";
export * from "./product.constants";
export * from "./brand.constants";
export * from "./voucher.constants";
export * from "./order.constants";
export * from "./review.constants";

//Theme
export const themeConstants = { CHANGE_THEME: "CHANGE_THEME" };

export const backendUrl =
  process.env.NODE_ENV === "production" ? "http://35.213.174.112" : "";
//export const backendUrl = "https://rocky-sierra-70366.herokuapp.com";
