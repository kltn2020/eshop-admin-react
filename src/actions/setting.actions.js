import { settingConstants } from "../constants";
import { settingService } from "../services";
import { history } from "../store";

export const settingActions = {
  getAll,
  update,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await settingService.getAll(url).then(
      (settings) => {
        history.replace({ pathname: "/setting", state: 200 });
        dispatch(success(settings));
      },
      (error) => {
        if (error.response && error.response.data) {
          let errorkey = Object.keys(error.response.data)[0];

          let errorValue = error.response.data[errorkey][0];

          dispatch(failure(errorkey.toUpperCase() + ": " + errorValue));
        } else {
          dispatch(failure(error.toString()));
        }
      }
    );
  };

  function request() {
    return { type: settingConstants.GETALL_REQUEST };
  }
  function success(setting) {
    return { type: settingConstants.GETALL_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.GETALL_FAILURE, error };
  }
}

function update(setting) {
  return async (dispatch) => {
    dispatch(request(setting));
    await settingService.update(setting).then(
      (setting) => {
        history.replace({ pathname: "/setting", state: 202 });
        dispatch(success(setting));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(setting) {
    return { type: settingConstants.UPDATE_REQUEST, setting };
  }
  function success(setting) {
    return { type: settingConstants.UPDATE_SUCCESS, setting };
  }
  function failure(error) {
    return { type: settingConstants.UPDATE_FAILURE, error };
  }
}
