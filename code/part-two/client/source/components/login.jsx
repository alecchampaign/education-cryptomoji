import React, { useState } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

const Login = props => {
  if (props.keys) {
    return (
      <button
        onClick={e => {
          props.history.push('user');
        }}
      >
        Login
      </button>
    );
  } else return <div></div>;
};

export default Login;
