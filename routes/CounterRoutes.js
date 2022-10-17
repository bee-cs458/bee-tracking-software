import express from 'express';
import { getCount, updateCount, deleteCount } from '../controllers/CounterController.js';

const router = express.Router();

router.get("/", getCount);
router.post("/", updateCount);
router.patch("/", updateCount)
router.delete("/:id", deleteCount)

export default router;