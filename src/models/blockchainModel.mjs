import fs from 'fs/promises';
import SHA256 from 'crypto-js/sha256.js';
import dotenv from 'dotenv';
import path from 'path';
import Block from './blockModel.mjs';

// Resolve the path to the config folder and then to config.env
const configFilePath = path.resolve(
  new URL('../../config/config.env', import.meta.url).pathname
);
dotenv.config({ path: configFilePath });

class Blockchain {
  constructor() {
    this.chain = [];
    this.currentId = 1;
    this.mineRate = parseInt(process.env.MINE_RATE) || 1000;
    this.difficulty = parseInt(process.env.DIFFICULTY) || 2;
    this.blockchainFilePath = path.resolve(
      process.cwd(),
      'data',
      'blockchain.json'
    ); // Define blockchain file path
    this.loadBlockchain();
  }

  async loadBlockchain() {
    try {
      const data = await fs.readFile(this.blockchainFilePath, 'utf-8');
      if (data.trim() === '') {
        console.log('Blockchain file is empty. Creating the genesis block.');
        this.createGenesisBlock();
        return;
      }
      const parsedData = JSON.parse(data);
      this.chain = parsedData.chain.map((blockData) => new Block(blockData));
      this.currentId = parsedData.currentId;
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('Blockchain file not found. Creating the genesis block.');
        this.createGenesisBlock();
      } else {
        console.error('Error loading blockchain:', error);
      }
    }
  }

  async saveBlockchain() {
    const data = JSON.stringify(
      { chain: this.chain, currentId: this.currentId },
      null,
      2
    );
    try {
      await fs.writeFile(this.blockchainFilePath, data, 'utf-8');
      console.log('Blockchain saved successfully.');
    } catch (error) {
      console.error('Error saving blockchain:', error);
    }
  }

  createGenesisBlock() {
    const genesisBlock = new Block(
      new Date().toISOString(),
      0, // Initialize ID as 0 for the genesis block
      '0',
      '0000000000', // Placeholder hash
      'Genesis Block',
      0, // Initial nonce
      this.difficulty
    );
    this.chain.push(genesisBlock);
    this.saveBlockchain();
  }

  addBlock(data) {
    try {
      // Validate data
      if (typeof data !== 'object') {
        // If data is not an object, treat it as a simple string
        data = { message: data };
      }

      const previousBlock = this.chain[this.chain.length - 1];
      let nonce = 0;
      let timestamp;
      let hash;

      do {
        nonce++;
        timestamp = new Date().toISOString(); // Convert timestamp to ISO string
        hash = this.calculateHash(previousBlock, data, nonce, timestamp);
      } while (!this.isValidHash(hash));

      // Assign ID based on the length of the chain
      const id = this.chain.length;

      console.log(`Adding block with ID: ${id}`); // Log the ID of the new block

      const newBlock = new Block({
        timestamp: timestamp, // Pass timestamp as string
        id: id, // Assign block ID
        previousHash: previousBlock.hash,
        hash: hash,
        data: data,
        nonce: nonce,
        difficulty: this.difficulty,
      });

      this.chain.push(newBlock);

      this.saveBlockchain(); // Call saveBlockchain to save the blockchain to file

      return { success: true, block: newBlock };
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error adding block:', error);
      // Return an error response to the client
      return {
        success: false,
        error: 'An unexpected error occurred while adding the block.',
      };
    }
  }

  adjustDifficulty(lastBlock, currentTimestamp) {
    let { difficulty, timestamp } = lastBlock;
    const timestampDifference = currentTimestamp - timestamp;

    if (timestampDifference > this.mineRate) {
      return Math.max(difficulty - 1, 1); // Ensure difficulty doesn't go below 1
    } else {
      return difficulty + 1;
    }
  }

  calculateHash(previousBlock, data, nonce, timestamp) {
    return SHA256(
      previousBlock.hash + JSON.stringify(data) + nonce + timestamp
    ).toString();
  }

  isValidHash(hash) {
    return hash.substring(0, this.difficulty) === '0'.repeat(this.difficulty);
  }

  getBlockById(id) {
    // Convert the input ID to a number for comparison
    const blockId = Number(id);

    console.log(`Searching for block with ID: ${blockId}`);

    const block = this.chain.find((block) => block.id === blockId);

    if (block) {
      console.log('Found block:', block);
    } else {
      console.log('Block not found');
    }

    return block;
  }

  getAllBlocks() {
    return this.chain;
  }
}

export default Blockchain;
