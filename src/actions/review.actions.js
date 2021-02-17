import { reviewConstants } from "../constants";
import { reviewService } from "../services";
import { history } from "../store";

export const reviewActions = {
  getAll,
  getById,
  reply,
  delete: _delete,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await reviewService.getAll(url).then(
      (reviews) => {
        history.replace({ pathname: history.location.pathname, state: 200 });
        dispatch(success(reviews));
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
    return { type: reviewConstants.GETALL_REQUEST };
  }
  function success(reviews) {
    return { type: reviewConstants.GETALL_SUCCESS, reviews };
  }
  function failure(error) {
    return { type: reviewConstants.GETALL_FAILURE, error };
  }
}

function getById(id, url) {
  return (dispatch) => {
    dispatch(request(id));
    reviewService.getById(id, url).then(
      (reviews) => {
        dispatch(success(reviews));
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

  function request(id) {
    return { type: reviewConstants.GETBYID_REQUEST, id };
  }
  function success(reviews) {
    return { type: reviewConstants.GETBYID_SUCCESS, reviews };
  }
  function failure(error) {
    return { type: reviewConstants.GETBYID_FAILURE, error };
  }
}

function reply(reply) {
  return async (dispatch) => {
    dispatch(request(reply));

    await reviewService.reply(reply).then(
      (reply) => {
        history.replace({ pathname: "/reviews", state: 201 });
        dispatch(success(reply));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(reply) {
    return { type: reviewConstants.REPLY_REQUEST, reply };
  }
  function success(reply) {
    return { type: reviewConstants.REPLY_SUCCESS, reply };
  }
  function failure(error) {
    return { type: reviewConstants.REPLY_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await reviewService.delete(id).then(
      () => {
        history.replace({ pathname: "/reviews", state: 203 });
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(id) {
    return { type: reviewConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: reviewConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: reviewConstants.DELETE_FAILURE, id, error };
  }
}
