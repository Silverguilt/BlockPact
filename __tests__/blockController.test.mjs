import { test, assert } from 'vitest';
import { createBlock } from '../src/controllers/blockController.mjs';

test('createBlock function', () => {
  assert('should create a new block with provided data', () => {
    const data = { message: 'This is a test block' };
    const result = createBlock({ body: { data } });
    return [
      assert(result.success).toBe(true),
      assert(result.block).toBeDefined(),
      assert(result.block.data).toEqual(data),
    ];
  });

  assert('should handle empty data', () => {
    const result = createBlock({ body: {} });
    return [
      assert(result.success).toBe(false),
      assert(result.error).toEqual('Data is required'),
    ];
  });

  assert('should handle invalid data format', () => {
    const data = 'This is not an object';
    const result = createBlock({ body: { data } });
    return [
      assert(result.success).toBe(false),
      assert(result.error).toEqual(
        'Invalid data format. Data must be a JSON object.'
      ),
    ];
  });

  assert('should handle empty string data', () => {
    const result = createBlock({ body: { data: '' } });
    return [
      assert(result.success).toBe(false),
      assert(result.error).toEqual(
        'Invalid data format. Data must be a JSON object.'
      ),
    ];
  });
});
