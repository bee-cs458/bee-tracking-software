import { getAllRecords } from "../controllers/RecordController.js";
import { restrictTo } from "../controllers/SecurityController.js";
import express from 'express';

const router = express.Router();

router.get("/get_all", restrictTo("owner"), getAllRecords);

export default router;