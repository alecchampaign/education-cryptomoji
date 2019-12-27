'use strict';

const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions');
const { decode, encode } = require('./services/encoding');
const {
  getCollectionAddress,
  getMojiAddress,
  getSireAddress,
  isValidAddress
} = require('./services/addressing');
const prng = require('./services/prng');
const { createHash } = require('crypto');

const FAMILY_NAME = 'cryptomoji';
const FAMILY_VERSION = '0.1';
const NAMESPACE = '5f4d76';

/**
 * A Cryptomoji specific version of a Hyperledger Sawtooth Transaction Handler.
 */
class MojiHandler extends TransactionHandler {
  /**
   * The constructor for a TransactionHandler simply registers it with the
   * validator, declaring which family name, versions, and namespaces it
   * expects to handle. We'll fill this one in for you.
   */
  constructor() {
    console.log('Initializing cryptomoji handler with namespace:', NAMESPACE);
    super(FAMILY_NAME, [FAMILY_VERSION], [NAMESPACE]);
  }

  /**
   * The apply method is where the vast majority of all the work of a
   * transaction processor happens. It will be called once for every
   * transaction, passing two objects: a transaction process request ("txn" for
   * short) and state context.
   *
   * Properties of `txn`:
   *   - txn.payload: the encoded payload sent from your client
   *   - txn.header: the decoded TransactionHeader for this transaction
   *   - txn.signature: the hex signature of the header
   *
   * Methods of `context`:
   *   - context.getState(addresses): takes an array of addresses and returns
   *     a Promise which will resolve with the requested state. The state
   *     object will have keys which are addresses, and values that are encoded
   *     state resources.
   *   - context.setState(updates): takes an update object and returns a
   *     Promise which will resolve with an array of the successfully
   *     updated addresses. The updates object should have keys which are
   *     addresses, and values which are encoded state resources.
   *   - context.deleteState(addresses): deletes the state for the passed
   *     array of state addresses. Only needed if attempting the extra credit.
   */
  apply(txn, context) {
    const updates = {};
    const mojiPrng = prng(txn.signature);
    const decodedPayload = decode(txn.payload);

    switch (decodedPayload.action) {
      case 'CREATE_COLLECTION':
        const collection = { key: txn.header.signerPublicKey, moji: [] };
        for (let i = 0; i < 3; i++) {
          collection.moji.push(
            createHash('sha512')
              .update(mojiPrng(100).toString())
              .digest('hex')
              .slice(0, 36)
          );
        }
        collection.moji = collection.moji.map(num => {
          const addr = getMojiAddress(txn.header.signerPublicKey, num);
          updates[addr] = encode({
            dna: num,
            owner: txn.header.signerPublicKey,
            breeder: null,
            sire: null,
            bred: [],
            sired: []
          });
          return addr;
        });
        updates[getCollectionAddress(txn.header.signerPublicKey)] = encode(
          collection
        );

        return context.setState(updates);
      default:
        throw new InvalidTransaction('UNKOWN ACTION');
    }
  }
}

module.exports = MojiHandler;
