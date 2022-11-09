import express from 'express';

import { getAllCheckoutRecords, checkoutAsset } from '../controllers/CheckoutController';
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'


const router = express.Router();

router.get("/all_records", getAllCheckoutRecords);
router.post("/checkout_assets", requireBody("asset_tags"), checkoutAsset);