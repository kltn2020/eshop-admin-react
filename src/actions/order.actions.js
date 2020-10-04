import { orderConstants } from "../constants";
import { orderService } from "../services";
import { history } from "../store";

export const orderActions = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());
    await orderService.getAll(url).then(
      (orders) => {
        dispatch(success(orders));
        history.replace({ pathname: history.location.pathname, state: 200 });
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
    return { type: orderConstants.GETALL_REQUEST };
  }
  function success(orders) {
    return { type: orderConstants.GETALL_SUCCESS, orders };
  }
  function failure(error) {
    return { type: orderConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await orderService.getAllNonPagination().then(
      (orders) => dispatch(success(orders)),
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
    return { type: orderConstants.GETALL_NONPAGINATION_REQUEST };
  }
  function success(orders) {
    return { type: orderConstants.GETALL_NONPAGINATION_SUCCESS, orders };
  }
  function failure(error) {
    return { type: orderConstants.GETALL_NONPAGINATION_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    dispatch(request(id));
    orderService.getById(id).then(
      (orders) => {
        dispatch(success(orders));
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
    return { type: orderConstants.GETBYID_REQUEST, id };
  }
  function success(orders) {
    return { type: orderConstants.GETBYID_SUCCESS, orders };
  }
  function failure(error) {
    return { type: orderConstants.GETBYID_FAILURE, error };
  }
}

function add(order, image) {
  return async (dispatch) => {
    dispatch(request(order));

    await orderService.add(order, image).then(
      (order) => {
        dispatch(success(order));
        history.push({ pathname: "/orders", state: 201 });
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

  function request(order) {
    return { type: orderConstants.ADD_REQUEST, order };
  }
  function success(order) {
    return { type: orderConstants.ADD_SUCCESS, order };
  }
  function failure(error) {
    return { type: orderConstants.ADD_FAILURE, error };
  }
}

function update(id, order, image, delImageId) {
  return async (dispatch) => {
    dispatch(request(order));
    await orderService.update(id, order, image, delImageId).then(
      (order) => {
        dispatch(success(id));
        history.push({ pathname: "/orders", state: 202 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(order) {
    return { type: orderConstants.UPDATE_REQUEST, order };
  }
  function success(id) {
    return { type: orderConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: orderConstants.UPDATE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await orderService.delete(id).then(
      () => {
        dispatch(success(id));
        history.replace({ pathname: "/orders", state: 203 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(id) {
    return { type: orderConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: orderConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: orderConstants.DELETE_FAILURE, id, error };
  }
}
