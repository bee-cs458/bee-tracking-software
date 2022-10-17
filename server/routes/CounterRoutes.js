import express from 'express';
import { getCount, updateCount } from '../controllers/CounterController.js';

const router = express.Router();

router.get("/", getCount);
router.post("/", updateCount);

export default router;