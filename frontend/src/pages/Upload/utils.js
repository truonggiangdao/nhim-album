import { API_URL } from "../../constants";

function makeRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(data);
  });
}

export const uploadSingleFileToApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await makeRequest("POST", API_URL + "uploadFile", formData);
  return response;
};

export const uploadFilesToApi = async (files) => {
  const succeed = [];
  const failed = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    try {
      await uploadSingleFileToApi(file);
      succeed.push(file);
    } catch (error) {
      failed.push(file);
    }
  }
  return { succeed, failed };
};
