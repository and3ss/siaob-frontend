import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import LoadingSpinner from '../components/LoadingSpinner';


const PrivateRoute = ({ component: Component, ...props }) => {

  const { signed, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner className="middleCenter" />
  }

  return (
    <Route
      {...props}
      render={ 
        () => signed
          ? <Component {...props} />
          : <Redirect to='/' /> 
      }
    />
  )
}

export default PrivateRoute;