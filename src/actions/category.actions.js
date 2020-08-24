import { categoryConstants } from "../constants";
import { categoryService } from "../services";
import { history } from "../store";

export const categoryActions = {
  getAll,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await categoryService.getAll(url).then(
      (categories) => {
        dispatch(success(categories));
        history.replace({ pathname: history.location.pathname, state: 200 });
      },
      (error) => {
        dispatch(failure(error));
        if (error && error.includes("not authenticated"))
          localStorage.removeItem("token");
      }
    );
  };

  function request() {
    return { type: categoryConstants.GETALL_REQUEST };
  }
  function success(categories) {
    return { type: categoryConstants.GETALL_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.GETALL_FAILURE, error };
  }
}
