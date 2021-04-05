import axios from 'axios';

import useAuth from '../hooks/useAuth';

const API = () => {

  
  const { token } = useAuth();

  const apiCon = axios.create({
    baseURL: `http://127.0.0.1:8000`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiCon.interceptors.request.use(
    config => {
      const token = sessionStorage.getItem('jwt');
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        delete API.defaults.headers.common.Authorization;
      }
      return config;
    },
  
    error => Promise.reject(error)
  );
  return apiCon;
}


export default API;