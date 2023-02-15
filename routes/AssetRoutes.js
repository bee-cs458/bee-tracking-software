import express from 'express';
import {
    getAllAssets,
    getSpecificAsset,
    getAllAssetsWithDueDates,
    getDueDateOfAsset,
    createAsset,
    updateAsset,
    deleteAsset,
    searchForAsset,
    getAssetFromCat,
    editAsset,
    // checkOutAsset,
    // checkInAsset
} from '../controllers/AssetController.js';
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'

const router = express.Router();

router.get("/due_dates/", getAllAssetsWithDueDates);
router.get("/due_dates/:id", getDueDateOfAsset);
router.get("/get_all_due_dates", getAllAssetsWithDueDates);
router.get("/get_all", getAllAssets);
router.get("/", getAllAssets);
router.get(
    "/search",
    requireQuery('limit', 'description'),
    filterQuery('limit', 'offset', 'description', 'damage_notes', 'asset_tag', 'name'),
    searchForAsset
);
router.get("/:id", getSpecificAsset);
router.get("/get_asset_via_cat/:id", getAssetFromCat)
router.post("/", restrictTo('owner'), requireBody('asset_tag', 'name'), createAsset);
router.post("/:id", restrictTo('owner'), requireBody(), updateAsset);
router.delete("/:id", restrictTo('owner'), deleteAsset);
router.post(
    "/editAsset/:oldTag",
    restrictTo('owner'),
    requireBody('asset_tag', 'name', 'description', 'damage_notes', 'category', 'operational', 'advanced'),
    editAsset
);
// router.post("/:id(\\d+)/checkout", restrictTo('operator'), checkOutAsset);
// router.post("/:id(\\d+)/checkin", restrictTo('operator'), checkInAsset);


export default router;
