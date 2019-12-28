import React, { useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const Login = props => {
  const [currentValue, setCurrentValue] = useState('');
  return (
    <React.Fragment>
      <input
        type='text'
        onChange={e => {
          setCurrentValue(e.target.value);
        }}
      ></input>
      <button
        onClick={e => {
          console.log(currentValue);
          props.setPrivateKey(currentValue);
          props.history.push('user');
        }}
      >
        Login
      </button>
    </React.Fragment>
  );
};

export default Login;
