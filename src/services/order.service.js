import axios from "axios";
import { backendUrl } from "../constants/index";

export const orderService = {
  getAll,
  getAllNonPagination,
  getById,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params =
    url === null
      ? `${backendUrl}/api/orders`
      : `${backendUrl}/api/orders` + url;

  return await axios.get(params).then(handleResponse).catch(handleError);
}

async function getAllNonPagination() {
  return await axios.get(`${backendUrl}/api/orders`).then(handleResponse);
}

async function getById(id) {
  return await axios
    .get(`${backendUrl}/api/orders/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

async function update(id, order) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(order);

  return await axios
    .put(`${backendUrl}/api/admin/orders/${id}`, body, requestConfig)
    .then(handleResponse)
    .catch(handleError);
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(`${backendUrl}/api/admin/orders/${id}`, requestConfig);
  });
  return Promise.all(promises).catch(handleError);
}

function handleResponse(response) {
  let data;
  if (response.data.data) data = response.data.data;
  else data = response.data;

  return data;
}

function handleError(error) {
  const errorServer = error.response.data.error;
  if (errorServer) {
    if (errorServer.errors) {
      let errorkey = Object.keys(errorServer.errors)[0];

      let errorValue = errorServer.errors[errorkey][0];

      return Promise.reject(errorkey.toUpperCase() + ": " + errorValue);
    } else if (errorServer.message) {
      return Promise.reject(errorServer.message);
    } else {
      return Promise.reject(errorServer.detail);
    }
  } else {
    return Promise.reject(
      error.response.data.code + ": " + error.response.data.message
    );
  }
}
