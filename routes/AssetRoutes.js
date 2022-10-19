import express from 'express';
import { getAllAssets } from '../controllers/AssetController.js';

const router = express.Router();

router.get("/get_all", getAllAssets);

export default router;