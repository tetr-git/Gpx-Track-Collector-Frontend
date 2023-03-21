import axios from "axios";

const API_URL = "http://localhost:3003/api/";

const register = async (email, password) => {
  const response = await axios.post(API_URL + "register", { email, password });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(
    API_URL + "login",
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(
    API_URL + "logout",
    {},
    { withCredentials: true }
  );
  return response.data;
};

export default {
  register,
  login,
  logout,
};
