import { voucherConstants } from "../constants";
import { voucherService } from "../services";
import { history } from "../store";

export const voucherActions = {
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
    await voucherService.getAll(url).then(
      (vouchers) => {
        history.replace({ pathname: history.location.pathname, state: 200 });
        dispatch(success(vouchers));
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
    return { type: voucherConstants.GETALL_REQUEST };
  }
  function success(vouchers) {
    return { type: voucherConstants.GETALL_SUCCESS, vouchers };
  }
  function failure(error) {
    return { type: voucherConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await voucherService.getAllNonPagination().then(
      (vouchers) => dispatch(success(vouchers)),
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: voucherConstants.GETALL_NONPAGINATION_REQUEST };
  }
  function success(vouchers) {
    return { type: voucherConstants.GETALL_NONPAGINATION_SUCCESS, vouchers };
  }
  function failure(error) {
    return { type: voucherConstants.GETALL_NONPAGINATION_FAILURE, error };
  }
}

function getById(id) {
  return (dispatch) => {
    dispatch(request(id));
    voucherService.getById(id).then(
      (vouchers) => {
        dispatch(success(vouchers));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(id) {
    return { type: voucherConstants.GETBYID_REQUEST, id };
  }
  function success(vouchers) {
    return { type: voucherConstants.GETBYID_SUCCESS, vouchers };
  }
  function failure(error) {
    return { type: voucherConstants.GETBYID_FAILURE, error };
  }
}

function add(voucher) {
  return async (dispatch) => {
    dispatch(request(voucher));

    await voucherService.add(voucher).then(
      (voucher) => {
        history.replace({ pathname: "/vouchers", state: 201 });
        dispatch(success(voucher));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(voucher) {
    return { type: voucherConstants.ADD_REQUEST, voucher };
  }
  function success(voucher) {
    return { type: voucherConstants.ADD_SUCCESS, voucher };
  }
  function failure(error) {
    return { type: voucherConstants.ADD_FAILURE, error };
  }
}

function update(id, voucher) {
  return async (dispatch) => {
    dispatch(request(voucher));
    await voucherService.update(id, voucher).then(
      (voucher) => {
        history.replace({ pathname: "/vouchers", state: 202 });
        dispatch(success(voucher));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(voucher) {
    return { type: voucherConstants.UPDATE_REQUEST, voucher };
  }
  function success(voucher) {
    return { type: voucherConstants.UPDATE_SUCCESS, voucher };
  }
  function failure(error) {
    return { type: voucherConstants.UPDATE_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await voucherService.delete(id).then(
      () => {
        history.replace({ pathname: "/vouchers", state: 203 });
        dispatch(success(id));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(id) {
    return { type: voucherConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: voucherConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: voucherConstants.DELETE_FAILURE, id, error };
  }
}
