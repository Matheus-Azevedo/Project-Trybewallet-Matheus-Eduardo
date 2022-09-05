import React from 'react';
import './css/App.css';
import { Route, Switch } from 'react-router-dom';
import Edition from './pages/Edition';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ (props) => <Login { ...props } /> }
      />
      <Route
        exact
        path="/carteira"
        render={ (props) => <Wallet { ...props } /> }
      />
      <Route
        exact
        path="/edition/:id"
        render={ (props) => <Edition { ...props } /> }
      />
    </Switch>
  );
}

export default App;
