import axios from "axios";

export const mainAxios = (token) => {
  const { REACT_APP_API_URL } = process.env;

  let headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const mainAxiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
    headers,
  });

  mainAxiosInstance.interceptors.response.use(
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
        return Promise.reject(error);
      }
    }
  );

  return mainAxiosInstance;
};

export const portalAxios = () => {
  const { REACT_APP_API_URL_PORTAL_TRANSP, REACT_APP_API_KEY_PORTAL_TRANSP } = process.env;

  const portalAxiosInstance = axios.create({
    baseURL: REACT_APP_API_URL_PORTAL_TRANSP,
    headers: {'chave-api-dados': `${REACT_APP_API_KEY_PORTAL_TRANSP}`}
  });

  portalAxiosInstance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
          alert("Servidor do Portal da Transparência com problemas, favor falar com administrador")
        });
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return portalAxiosInstance;
};

export const customAxios = (baseURL) => {

  const customAxiosInstance = axios.create({ baseURL: baseURL });

  customAxiosInstance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
          alert("Servidor Externo com problemas, favor falar com administrador. Link: "+baseURL)
        });
      }
    }
  );

  return customAxiosInstance;
};