import axios from "axios";

const API_URL = process.env.REACT_APP_GRC_BACKEND_URL;

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

  const token = response.data.token;

  if (token) {
    const user = {
      ...response.data.user,
      accessToken: token,
    };
    localStorage.setItem("user", JSON.stringify(user));
  }

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
