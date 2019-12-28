import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserMoji, postCollection } from '../services/requesting';
import { getCollectionAddress } from '../services/addressing';

const User = props => {
  useEffect(() => {
    console.log(props.privateKey.length);
    postCollection(props.privateKey)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  });
  return <div id='collection'></div>;
};

export default User;
