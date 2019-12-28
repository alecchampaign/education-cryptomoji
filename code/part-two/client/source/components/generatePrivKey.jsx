import React, { useState } from 'react';
import { randomBytes, createHash } from 'crypto';

const GeneratePrivKey = props => {
  const [privateKey, setPrivateKey] = useState('');
  return (
    <React.Fragment>
      <button
        onClick={e => {
          setPrivateKey(
            createHash('sha256')
              .update(randomBytes(256))
              .digest('hex')
          );
        }}
      >
        Generate a private key
      </button>
      <p>
        Private key: <span>{privateKey}</span>
      </p>
    </React.Fragment>
  );
};

export default GeneratePrivKey;
