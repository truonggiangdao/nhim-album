import { API_URL } from "../constants";
import { makeRequest } from "./api";


export const trackFileInfo = async (data) => {
  try {
    await makeRequest('POST', `${API_URL}trackFileInfo`, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
