import express from 'express';
import {
    getAllAssets,
    getSpecificAsset,
    getAllAssetsWithDueDates,
    getDueDateOfAsset,
    createAsset,
    updateAsset,
    deleteAsset,
    getAssetFromCat,
    // checkOutAsset,
    // checkInAsset
} from '../controllers/AssetController.js';
import { requireBody, restrictTo } from '../controllers/Authenticator.js'

const router = express.Router();

router.get("/due_dates/", getAllAssetsWithDueDates);
router.get("/due_dates/:id", getDueDateOfAsset);
router.get("/get_all_due_dates", getAllAssetsWithDueDates);
router.get("/get_all", getAllAssets);
router.get("/", getAllAssets);
router.get("/:id", getSpecificAsset);
router.get("/get_asset_via_cat/:id", getAssetFromCat)
router.post("/", restrictTo('owner'), requireBody('asset_tag', 'name'), createAsset);
router.post("/:id", restrictTo('owner'), requireBody(), updateAsset);
router.delete("/:id", restrictTo('owner'), deleteAsset);
// router.post("/:id(\\d+)/checkout", restrictTo('operator'), checkOutAsset);
// router.post("/:id(\\d+)/checkin", restrictTo('operator'), checkInAsset);


export default router;
