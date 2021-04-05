import React, { createContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
  const [storageToken, setStorageToken, removeStorageToken] = useLocalStorage('@authApp: token');

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (storageUser && storageToken) {
      // setUser(storageUser);
      // api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
    } else{
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageToken, storageUser]);

  async function signIn(user, pass, remember) {
    setLoading(true);
    axios.post(`${REACT_APP_API_URL}/auth/login`, {
      email: user,
      password: pass
    })
    .then(function (response) {
      var userData = response.data['userData'];
      var access_token = response.data['tokenData']['access_token'];

      setUser({user: userData, token: access_token});

      if(remember) {
        setStorageUser(userData);
        setStorageToken(access_token);
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 401) {
        alert("Credenciais Inválidas, tente novamente");
      } else if (error.request) {
        alert("Nenhuma resposta do servidor, favor falar com administrador(1)");
      } else {
        alert("Nenhuma resposta do servidor, favor falar com administrador(2)");
      }
    });
    setLoading(false);
    // setLoading(true);
    // const formData = new FormData();
    // let data = {
    //   apiFunctionName: "getToken",
    //   apiFunctionParams:{
    //     username: user,
    //     pass: pass
    //   }
    // }
    // formData.append('data', JSON.stringify(data));
    // const response = await apiFunction(formData);
    // // console.log(response);
    // setLoading(false);
    // if (response && response.response === "200") {
    //   setUser({username: user});

    //   if(remember) {
    //     setStorageUser(response.userData);
    //     setStorageToken(response.userData['token']);
    //   }
    // } else {
    //   if (response) {
    //     alert(response.userMessage);
    //   } else {
    //     alert('Servidor não respondendo, entre em contato com o administrador');
    //   }
    // }

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
      signed: (user) ? true : false, 
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