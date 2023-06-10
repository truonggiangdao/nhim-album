import { API_URL } from "../constants";

export const verifyToken = async (token) => {
  try {
    const res = await fetch(`${API_URL}verifyToken?token=${token}`);
    console.log(res.json());
    return true;
  } catch (error) {
    return false;
  }
};
