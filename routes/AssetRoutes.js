import express from 'express';
import {
    getAllAssets,
    getSpecificAsset,
    getAllAssetsWithDueDates,
    getDueDateOfAsset,
    createAsset,
    updateAsset,
    deleteAsset,
    // checkOutAsset,
    // checkInAsset
} from '../controllers/AssetController.js';
import { requireBody, restrictTo } from '../controllers/Authenticator.js'

const router = express.Router();

router.get("/due_dates/", getAllAssetsWithDueDates);
router.get("/due_dates/:id(\\d+)", getDueDateOfAsset);
router.get("/", getAllAssets);
router.get("/:id(\\d+)", getSpecificAsset);
router.post("/", restrictTo('owner'), requireBody('asset_tag', 'name'), createAsset);
router.post("/:id(\\d+)", restrictTo('owner'), requireBody(), updateAsset);
router.delete("/:id(\\d+)", restrictTo('owner'), deleteAsset);
// router.post("/:id(\\d+)/checkout", restrictTo('operator'), checkOutAsset);
// router.post("/:id(\\d+)/checkin", restrictTo('operator'), checkInAsset);


export default router;
