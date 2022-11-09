import express from "express";
import {
  getCheckoutRecordsByTag,
  getCheckoutRecordsByUser,
  getAllCheckedOutRecords,
  checkInAsset,
  checkInAssetWithNotes,
  getOverdueInfo,
  incrementStudentStrikes,
} from "../controllers/CheckInController.js";

const router = express.Router();

router.get("/byasset/:tag", getCheckoutRecordsByTag); //asset tag
router.get("/:id", getCheckoutRecordsByUser);//userid
router.get("/", getAllCheckedOutRecords);
router.post("/checkin/:id", checkInAsset);//recordid
router.post("/checkin/:id/:notes", checkInAssetWithNotes);//recordid
router.get("/overdue/:id", getOverdueInfo);//recordid if true it is overdue
router.post("/student/:id", incrementStudentStrikes);//userid

export default router;
