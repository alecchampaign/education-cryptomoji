import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import GeneratePrivKey from './components/generatePrivKey';
import Login from './components/login';
import User from './components/user';

const App = props => {
  const [keys, setKeys] = useState('');
  return (
    <Switch>
      <Route path='/user'>
        <User privateKey={keys.privateKey} />
      </Route>
      <Route
        path='/'
        render={props => (
          <React.Fragment>
            <h1>Hello, Cryptomoji!</h1>
            <GeneratePrivKey setKeys={setKeys} keys={keys} />
            <Login {...props} setKeys={setKeys} keys={keys} />
          </React.Fragment>
        )}
      ></Route>
    </Switch>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
