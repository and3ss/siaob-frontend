import React from 'react';
import { Switch, Route } from "react-router-dom";

import PrivateRoute from './PrivateRoute';

// import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Users from '../pages/Users';
import Tarefas from '../pages/Tarefas';
import Dashboard from '../pages/Dashboard';
import Obras from '../pages/Obras';
import Obra from '../pages/Obras/Obra';
import CadastroObra from '../pages/CadastroObra';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <Switch>
    <Route path="/" component={SignIn} exact />
    <PrivateRoute path="/Users" component={Users} />
    <PrivateRoute path="/Tarefas" component={Tarefas} />
    <PrivateRoute path="/Dashboard" component={Dashboard} />
    <PrivateRoute path="/Obras" component={Obras} />
    <PrivateRoute path="/Obra" component={Obra} />
    <PrivateRoute path="/CadastroObra" component={CadastroObra} />
    <Route path="*" component={NotFound} exact />
  </Switch>
);

export default Routes;