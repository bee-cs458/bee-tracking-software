import express from 'express';
import { getAllAssets, getAllAssetsWithDueDates } from '../controllers/AssetController.js';

const router = express.Router();

router.get("/get_all_due_dates", getAllAssetsWithDueDates);
router.get("/get_all", getAllAssets);

export default router;