import React, { useState } from 'react';
import { randomBytes, createHash } from 'crypto';
import { createKeys } from '../services/signing';

const GeneratePrivKey = props => {
  return (
    <React.Fragment>
      <button
        onClick={e => {
          props.setKeys(createKeys());
        }}
      >
        Generate a private key
      </button>
      <div>
        <p>
          Private key: <span>{props.keys.privateKey}</span>
        </p>
        <p>
          Public key: <span>{props.keys.publicKey}</span>
        </p>
      </div>
    </React.Fragment>
  );
};

export default GeneratePrivKey;
