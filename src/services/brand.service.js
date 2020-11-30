import axios from "axios";
import { backendUrl } from "../constants/index";

export const brandService = {
  getAll,
};

async function getAll(url = null) {
  const params =
    url === null
      ? `${backendUrl}/api/admin/brands`
      : `${backendUrl}/api/admin/brands` + url;

  return await axios.get(params).then(handleResponse).catch(handleError);
}

function handleResponse(response) {
  let data = response.data.data;

  return data;
}

function handleError(error) {
  if (error.response.data.error && error.response.data.error.errors) {
    let errorkey = Object.keys(error.response.data.error.errors)[0];

    let errorValue = error.response.data.error.errors[errorkey][0];

    return Promise.reject(errorkey.toUpperCase() + ": " + errorValue);
  } else {
    return Promise.reject(error.response.data.message);
  }
}
