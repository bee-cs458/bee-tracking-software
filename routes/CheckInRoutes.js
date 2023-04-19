import express from "express";
import {
  getCheckoutRecordsByTag,
  getCheckoutRecordsByUser,
  getAllCheckedOutRecords,
  checkInAsset,
  checkInAssetWithNotes,
  checkInAssetWithDamageNotes,
  getOverdueInfo,
  incrementStudentStrikes,
  getAssetsForRecordsByUser,
} from "../controllers/CheckInController.js";
import { requireBody } from "../controllers/SecurityController.js";

const router = express.Router();

router.get("/byasset/:tag", getCheckoutRecordsByTag); //asset tag
router.get("/:id", getCheckoutRecordsByUser);//userid
router.get("/assets/:id", getAssetsForRecordsByUser)//userid
router.get("/", getAllCheckedOutRecords);
//router.post("/checkin/:id", checkInAsset);//recordid
router.post("/checkin/:id", requireBody('notes'), checkInAssetWithNotes);//recordId
router.post("/checkin/notes/:id/", requireBody('notes', 'damage', 'damageNotes'), checkInAssetWithDamageNotes);//recordid
router.get("/overdue/:id", getOverdueInfo);//recordid if true it is overdue
router.post("/student/:id", incrementStudentStrikes);//userid

export default router;
