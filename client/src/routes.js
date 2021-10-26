import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NewUser from './pages/NewUser';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/newuser" exact component={NewUser} />
    </Switch>
  );
}
