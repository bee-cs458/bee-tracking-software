import express from 'express';

import { getAllCheckoutRecords, getCheckoutStatus, checkoutAsset, makeAssetCheckedOut } from '../controllers/CheckoutController.js';
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'


const router = express.Router();

router.get("/all_records", getAllCheckoutRecords);
router.get("/status/:id", getCheckoutStatus)
router.post("/checkout_assets", //restrictTo("operator"), 
    requireBody("asset_tag", "student_id", "opId"), checkoutAsset);
router.post("/assetcheckedout", requireBody("asset_tag"), makeAssetCheckedOut)

export default router;