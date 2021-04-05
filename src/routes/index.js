import React from 'react';
import { Switch, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Obras from '../pages/Obras';
import Obra from '../pages/Obras/Obra';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    <PrivateRoute path="/Dashboard" component={Dashboard} />
    <PrivateRoute path="/Obras" component={Obras} />
    <PrivateRoute path="/Obra" component={Obra} />
    <Route path="*" component={NotFound} exact />
  </Switch>
);

export default Routes;