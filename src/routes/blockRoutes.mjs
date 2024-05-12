import express from 'express';
import {
  createBlock,
  getAllBlocks,
  getBlockById,
} from '../controllers/blockController.mjs';

const router = express.Router();

// Define routes
router.post('/blocks', createBlock);
router.get('/blocks', getAllBlocks);
router.get('/blocks/:id', getBlockById);

export default router;
