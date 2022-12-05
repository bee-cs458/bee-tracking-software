import { getAllRecords } from "../controllers/RecordController";
import { restrictTo } from "../controllers/SecurityController";

router.get("/get_all", restrictTo('owner'), getAllRecords);