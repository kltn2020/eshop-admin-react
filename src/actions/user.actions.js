import { userConstants } from "../constants";
import { userService } from "../services";
import { history } from "../store";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  getAllNonPagination,
  delete: _delete,
  getMe,
  add,
  update,
  getById,
};

function getMe() {
  return async (dispatch) => {
    dispatch(request());

    await userService.getMe().then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GETME_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GETME_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETME_FAILURE, error };
  }
}

function login(user) {
  return async (dispatch) => {
    dispatch(request({ user }));

    await userService.login(user).then(
      (data) => {
        history.push({ pathname: "/", state: 200 });
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(data) {
    return { type: userConstants.LOGIN_SUCCESS, data };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  history.push("/login");
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return async (dispatch) => {
    dispatch(request(user));

    await userService.register(user).then(
      (token) => {
        dispatch(success(token));
        history.replace({ pathname: "/", state: 200 });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(token) {
    return { type: userConstants.REGISTER_SUCCESS, token };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function add(user) {
  return async (dispatch) => {
    dispatch(request(user));

    await userService.add(user).then(
      (user) => {
        history.replace({ pathname: "/users", state: 201 });
        dispatch(success(user));
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

  function request(user) {
    return { type: userConstants.ADD_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.ADD_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.ADD_FAILURE, error };
  }
}

function getAll(url) {
  return async (dispatch) => {
    dispatch(request());

    await userService.getAll(url).then(
      (users) => {
        dispatch(success(users));
      },
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getAllNonPagination() {
  return async (dispatch) => {
    dispatch(request());
    await userService.getAllNonPagination().then(
      (users) => dispatch(success(users)),
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
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getById(id) {
  return async (dispatch) => {
    dispatch(request(id));
    await userService.getById(id).then(
      (user) => dispatch(success(user)),
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
    return { type: userConstants.GETBYID_REQUEST, id };
  }
  function success(user) {
    return { type: userConstants.GETBYID_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETBYID_FAILURE, error };
  }
}

function update(id, user, user_permissions) {
  return async (dispatch) => {
    dispatch(request(id));
    await userService.update(id, user, user_permissions).then(
      (id) => {
        history.replace({ pathname: "/users", state: 202 });
        dispatch(success(id));
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
    return { type: userConstants.UPDATE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.UPDATE_SUCCESS, id };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, id, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return async (dispatch) => {
    dispatch(request(id));

    await userService.delete(id).then(
      async (id) => {
        history.replace({ pathname: "/users", state: 203 });
        dispatch(success(id));
        await dispatch(getAll());
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
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
