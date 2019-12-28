import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import GeneratePrivKey from './components/generatePrivKey';
import Login from './components/login';

const App = props => {
  const [privateKey, setPrivateKey] = useState('');
  return (
    <Switch>
      <Route path='/user'>
        <div>LOGGED IN: {privateKey}</div>
      </Route>
      <Route
        path='/'
        render={props => (
          <React.Fragment>
            <h1>Hello, Cryptomoji!</h1>
            <GeneratePrivKey
              setPrivateKey={setPrivateKey}
              privateKey={privateKey}
            />
            <Login
              {...props}
              setPrivateKey={setPrivateKey}
              privateKey={privateKey}
            />
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
