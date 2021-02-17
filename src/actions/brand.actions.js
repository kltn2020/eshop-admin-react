import { brandConstants } from "../constants";
import { brandService } from "../services";
import { history } from "../store";

export const brandActions = {
  getAll,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await brandService.getAll(url).then(
      (brands) => {
        history.replace({ pathname: history.location.pathname, state: 200 });
        dispatch(success(brands));
      },
      (error) => {
        dispatch(failure(error));
        if (error && error.includes("not authenticated"))
          localStorage.removeItem("token");
      }
    );
  };

  function request() {
    return { type: brandConstants.GETALL_REQUEST };
  }
  function success(brands) {
    return { type: brandConstants.GETALL_SUCCESS, brands };
  }
  function failure(error) {
    return { type: brandConstants.GETALL_FAILURE, error };
  }
}
