import axios from "axios";
import { backendUrl } from "../constants/index";

export const settingService = {
  getAll,
  update,
};

async function getAll(url = null) {
  const params =
    url === null
      ? `${backendUrl}/api/admin/setting`
      : `${backendUrl}/api/admin/setting` + url;

  return await axios.get(params).then(handleResponse).catch(handleError);
}

async function update(setting) {
  const requestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(setting);

  return await axios
    .put(`${backendUrl}/api/admin/setting`, body, requestConfig)
    .then(handleResponse)
    .catch(handleError);
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
