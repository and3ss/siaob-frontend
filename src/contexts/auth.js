import React, { createContext, useState, useEffect, useCallback } from 'react';
import { apiFunction } from '../services/api';
import useLocalStorage from '../hooks/useLocalStorage';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
  const [storageToken, setStorageToken, removeStorageToken] = useLocalStorage('@authApp: token');

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  async function validateStorageToken() {
    const formData = new FormData();
    let data = {
      idUser: storageUser.id_user,
      apiToken: storageToken,
      apiFunctionName: "validateRequest"
    }
    formData.append('data', JSON.stringify(data));
    // console.log(formData);
    const response = await apiFunction(formData);
    if (response && response.response === "200") {
      setUser(storageUser);
    } else {
      if (response) {
        alert(response.response+": "+response.responseDescription);
      } else {
        alert('Servidor não respondendo, entre em contato com o administrador');
      }
      removeStorageUser();
      removeStorageToken();
      setUser({});
    }
    setLoading(false);
  }
  
  useEffect(() => {

    if (storageUser && storageToken) {

      validateStorageToken();
      // setUser(storageUser);
      // api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
    } else{
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageToken, storageUser]);

  async function signIn(user, pass, remember) {
    setLoading(true);
    const formData = new FormData();
    let data = {
      apiFunctionName: "getToken",
      apiFunctionParams:{
        username: user,
        pass: pass
      }
    }
    formData.append('data', JSON.stringify(data));
    const response = await apiFunction(formData);
    // console.log(response);
    setLoading(false);
    if (response && response.response === "200") {
      setUser(response.userData);

      if(remember) {
        setStorageUser(response.userData);
        setStorageToken(response.userData['token']);
      }
    } else {
      if (response) {
        alert(response.userMessage);
      } else {
        alert('Servidor não respondendo, entre em contato com o administrador');
      }
    }

  }
    
  const signOut = useCallback( () => {
  
    setLoading(true);
    removeStorageUser();
    removeStorageToken();
    setUser({});
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