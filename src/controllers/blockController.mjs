import Blockchain from '../models/blockchainModel.mjs';

const blockchain = new Blockchain();

// Controller functions
const createBlock = (req, res) => {
  const { data } = req.body;
  blockchain.addBlock(data); // Assuming addBlock expects data in string format
  res.status(201).json({ message: 'Block created successfully' });
};

const getAllBlocks = (req, res) => {
  const blocks = blockchain.getAllBlocks();
  res.json(blocks);
};

const getBlockById = (req, res) => {
  const { id } = req.params;
  const block = blockchain.getBlockById(id);
  if (block) {
    res.json(block);
  } else {
    res.status(404).json({ message: 'Block not found' });
  }
};

export { createBlock, getAllBlocks, getBlockById };
