import { getAllRecords, getAllCheckedOutRecords} from "../controllers/RecordController.js";
import { restrictTo } from "../controllers/SecurityController.js";
import express from 'express';

const router = express.Router();

router.get("/get_all", restrictTo("student"), getAllRecords);
router.get("/get_all_checked_out", restrictTo("student"), getAllCheckedOutRecords);


export default router;