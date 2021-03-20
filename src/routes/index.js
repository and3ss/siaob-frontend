import React from 'react';
import { Switch, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    {/* <Route path="/signin" component={SignIn} /> */}
    <PrivateRoute path="/Dashboard" component={Dashboard} />
    <Route path="*" component={NotFound} exact />
  </Switch>
);

export default Routes;