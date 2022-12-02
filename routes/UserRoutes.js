import {
    updateUser,
    searchForUser,
    invertAdvancedStatus
} from "../controllers/UserController.js";
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'
import { getAllUsers } from "../controllers/UserController.js";
import express from 'express';
const router = express.Router();

router.post("/update_password", restrictTo('operator'), requireBody('password', 'newPassword'), updateUser);
router.get("/get_all", getAllUsers);
router.get("/", getAllUsers);
router.get(
    "/search",
    requireQuery('limit', 'first_name', 'last_name'),
    filterQuery('limit', 'offset', 'user_id', 'first_name', 'last_name'),
    searchForUser
);
router.patch("/invert_advanced", invertAdvancedStatus);

export default router;