import React, { createContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { mainAxios } from '../services/axiosInstance';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
  const [storageToken, setStorageToken, removeStorageToken] = useLocalStorage('@authApp: token');

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (storageUser && storageToken && !user.token) {
      setUser({user: storageUser, token: storageToken});
    }
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageToken, storageUser, user]);

  async function signIn(user, pass) {
    mainAxios().post('/auth/login', {
      email: user,
      password: pass
    })
    .then((response) => {
      var userData = response.data['userData'];
      var access_token = response.data['tokenData']['access_token'];

      setUser({user: userData, token: access_token});
      setStorageUser(userData);
      setStorageToken(access_token);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        alert("Credenciais Inválidas, tente novamente");
      } else if (error.request) {
        alert("Erro interno do servidor, favor falar com administrador");
      } else {
        alert("Servidor com problemas, favor falar com administrador");
      }
    });
  }
    
  const signOut = useCallback( () => {
  
    setLoading(true);
    removeStorageUser();
    removeStorageToken();
    setUser('');
    setLoading(false);
  }, [removeStorageToken, removeStorageUser]);

  return (

    <AuthContext.Provider value={{ 
      signed: (user && user.token) ? true : false, 
      user, 
      signIn, 
      signOut, 
      loading 
    }}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContext;