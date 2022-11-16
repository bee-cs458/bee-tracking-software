import express from 'express';

import { getAllCheckoutRecords, getCheckoutStatus, checkoutAsset } from '../controllers/CheckoutController.js';
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'


const router = express.Router();

router.get("/all_records", getAllCheckoutRecords);
router.get("/status/:id", getCheckoutStatus)
router.post("/checkout_assets", restrictTo("operator"), requireBody("asset_tags", "student_id"), checkoutAsset);

export default router;