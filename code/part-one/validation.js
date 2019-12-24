'use strict';

const { createHash } = require('crypto');
const signing = require('./signing');
const { Block } = require('./blockchain');

/**
 * A simple validation function for transactions. Accepts a transaction
 * and returns true or false. It should reject transactions that:
 *   - have negative amounts
 *   - were improperly signed
 *   - have been modified since signing
 */
const isValidTransaction = transaction => {
  if (transaction.amount < 0) return false;
  const message =
    transaction.source + transaction.recipient + transaction.amount;
  if (!signing.verify(transaction.source, message, transaction.signature))
    return false;
  return true;
};

/**
 * Validation function for blocks. Accepts a block and returns true or false.
 * It should reject blocks if:
 *   - their hash or any other properties were altered
 *   - they contain any invalid transactions
 */
const isValidBlock = block => {
  const compareHash = createHash('sha512')
    .update(block.transactions + block.previousHash + block.nonce)
    .digest('hex');

  if (compareHash !== block.hash) return false;

  for (let tx of block.transactions) {
    if (isValidTransaction(tx) === false) return false;
  }

  return true;
};

/**
 * One more validation function. Accepts a blockchain, and returns true
 * or false. It should reject any blockchain that:
 *   - is a missing genesis block
 *   - has any block besides genesis with a null hash
 *   - has any block besides genesis with a previousHash that does not match
 *     the previous hash
 *   - contains any invalid blocks
 *   - contains any invalid transactions
 */
const isValidChain = blockchain => {
  if (blockchain.blocks[0].previousHash !== null) {
    return false;
  }
  for (let i = 1; i < blockchain.blocks.length; i++) {
    const block = blockchain.blocks[i];
    const prevBlock = blockchain.blocks[i - 1];
    if (block.hash === null) return false;
    if (block.previousHash !== prevBlock.hash) return false;
    if (!isValidBlock(block)) return false;
    for (let tx of block.transactions) {
      if (!isValidTransaction(tx)) return false;
    }
  }
  return true;
};

/**
 * This last one is just for fun. Become a hacker and tamper with the passed in
 * blockchain, mutating it for your own nefarious purposes. This should
 * (in theory) make the blockchain fail later validation checks;
 */

const breakChain = blockchain => {
  const blockToSwap = blockchain.blocks[1];
  const maliciousBlock = new Block(
    blockToSwap.transactions,
    blockchain.blocks[3].hash
  );
  maliciousBlock.transactions.pop();
  blockchain.blocks[4] = maliciousBlock;
};

module.exports = {
  isValidTransaction,
  isValidBlock,
  isValidChain,
  breakChain
};
