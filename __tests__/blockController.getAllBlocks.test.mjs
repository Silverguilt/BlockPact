import { test, assert } from 'vitest';
import { getAllBlocks } from '../src/controllers/blockController.mjs';
import Blockchain from '../src/models/blockchainModel.mjs';

test('getAllBlocks function', () => {
  assert('should return all blocks in the blockchain', () => {
    const blockchain = new Blockchain();
    blockchain.addBlock({ message: 'Block 1' });
    blockchain.addBlock({ message: 'Block 2' });
    blockchain.addBlock({ message: 'Block 3' });

    const result = getAllBlocks();

    return [
      assert(result.length).toBe(3),
      assert(result[0].data.message).toBe('Block 1'),
      assert(result[1].data.message).toBe('Block 2'),
      assert(result[2].data.message).toBe('Block 3'),
    ];
  });

  assert('should return an empty array if no blocks exist', () => {
    const blockchain = new Blockchain();

    const result = getAllBlocks();

    return assert(result).toEqual([]);
  });
});
