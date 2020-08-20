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
        dispatch(success(brands));
        history.replace({ pathname: history.location.pathname, state: 200 });
      },
      (error) => {
        dispatch(failure(error));
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
