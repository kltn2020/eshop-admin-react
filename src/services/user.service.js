//import { authHeader } from "../store";
import axios from "axios";
import { backendUrl } from "../constants/index";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getAllNonPagination,
  getById,
  update,
  delete: _delete,
  getMe,
  add,
};

async function login(user) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(user);

  return await axios
    .post(`${backendUrl}/api/auth/login`, body, requestConfig)
    .then(handleResponse)
    .catch(handleError);
}

async function register(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);
  return await axios
    .post(`${backendUrl}/api/auth/register`, body, config)
    .then(handleResponse)
    .catch(handleError);
}

async function getMe() {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return await axios
    .get(`${backendUrl}/api/home/profile`, requestConfig)
    .then(handleResponse);
}

function logout() {
  // remove user from local storage to log user out
  //await axios.post("/api/auth/logout/");
  return localStorage.removeItem("token");
}

async function getAll(url = null) {
  const requestConfig = {
    //headers: authHeader()
  };
  const params =
    url === null ? `${backendUrl}/api/users` : `${backendUrl}/api/users` + url;

  return await axios.get(params, requestConfig).then(handleResponse);
}

async function getAllNonPagination() {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`${backendUrl}/api/users/`, requestConfig)
    .then(handleResponse);
}

async function getById(id) {
  const requestConfig = {
    //headers: authHeader(),
  };
  return await axios
    .get(`${backendUrl}/api/users/${id}`, requestConfig)
    .then(handleResponse);
}

async function add(user) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  user.is_staff === false
    ? (user.is_staff = "False")
    : (user.is_staff = "True");

  const body = JSON.stringify(user);
  await axios
    .post(`${backendUrl}/api/users/`, body, config)
    .then(handleResponse);
}

async function update(id, user, user_permissions) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const permissions = JSON.stringify({ user_permissions: user_permissions });
  await axios
    .post(
      `${backendUrl}/api/users/${id}/set_permissions/`,
      permissions,
      requestConfig
    )
    .then(handleResponse);

  const body = JSON.stringify(user);

  await axios
    .put(`${backendUrl}/api/users/${id}/`, body, requestConfig)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };
  const promises = await ids.map((id) => {
    return axios.delete(`${backendUrl}/api/users/${id}`, requestConfig);
  });
  return Promise.all(promises).then(handleResponse);
}

function handleResponse(response) {
  let data;
  data = response.data;

  return data;
}

function handleError(error) {
  if (error.response.data.error && error.response.data.error.errors) {
    let errorkey = Object.keys(error.response.data.error.errors)[0];

    let errorValue = error.response.data.error.errors[errorkey][0];

    return Promise.reject(errorkey.toUpperCase() + ": " + errorValue);
  } else {
    return Promise.reject(error.response.data.error.message);
  }
}
