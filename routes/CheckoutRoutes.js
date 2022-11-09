import express from 'express';

import { getAllCheckoutRecords, checkoutAsset } from '../controllers/CheckoutController.js';
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'


const router = express.Router();

router.get("/all_records", getAllCheckoutRecords);
router.post("/checkout_assets", requireBody("asset_tags", "user_id", "due_date"), checkoutAsset);

export default router;