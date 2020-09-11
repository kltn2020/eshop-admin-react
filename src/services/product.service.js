import axios from "axios";
import { backendUrl } from "../constants/index";

export const productService = {
  getAll,
  getAllNonPagination,
  getById,
  add,
  update,
  delete: _delete,
};

async function getAll(url = null) {
  const params =
    url === null
      ? `${backendUrl}/api/products`
      : `${backendUrl}/api/products` + url;

  return await axios.get(params).then(handleResponse).catch(handleError);
}

async function getAllNonPagination() {
  return await axios.get(`${backendUrl}/api/products`).then(handleResponse);
}

async function getById(id) {
  return await axios
    .get(`${backendUrl}/api/products/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

async function add(product, image) {
  if (image) {
    const imageData = new FormData();

    let imageUrl = [];
    for (let i = 0; i < image.length; i++) {
      imageData.append("image", image[i].img);

      const imageDataConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios
        .post(`${backendUrl}/api/admin/upload`, imageData, imageDataConfig)
        .then(handleResponse)
        .catch(handleError);

      imageUrl.push({ url: res });
    }
    Object.assign(product, { images: imageUrl });
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(product);

    return await axios
      .post(`${backendUrl}/api/admin/products`, body, requestConfig)
      .then(handleResponse)
      .catch(handleError);
  } else {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(product);

    return await axios
      .post(`${backendUrl}/api/admin/products`, body, requestConfig)
      .then(handleResponse)
      .catch(handleError);
  }
}

async function update(id, product, image, delImage) {
  if (image.length > 0) {
    const imageData = new FormData();

    let imageUrl = [];
    for (let i = 0; i < image.length; i++) {
      imageData.append("image", image[i].img);

      const imageDataConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await axios
        .post(`${backendUrl}/api/admin/upload`, imageData, imageDataConfig)
        .then(handleResponse)
        .catch(handleError);

      imageUrl.push({ url: res });
    }
    Object.assign(product, { images: imageUrl });
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      ...product,
      images: [...product.images, ...imageUrl],
    });

    return await axios
      .put(`${backendUrl}/api/admin/products/${id}`, body, requestConfig)
      .then(handleResponse)
      .catch(handleError);
  } else {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(product);

    return await axios
      .put(`${backendUrl}/api/admin/products/${id}`, body, requestConfig)
      .then(handleResponse)
      .catch(handleError);
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
async function _delete(ids) {
  const requestConfig = {
    // headers: authHeader()
  };

  const promises = await ids.map((id) => {
    return axios.delete(
      `${backendUrl}/api/admin/products/${id}`,
      requestConfig
    );
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
