/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

<useAuth />
export default (token) => {
  const { REACT_APP_API_URL } = process.env;

  let headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
          alert("Servidor Interno com problemas, favor falar com administrador")
        });
      }

      if (error.response.status === 403 || error.response.status === 500) {
        localStorage.removeItem("@authApp: token");

        window.location = "/";
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};
