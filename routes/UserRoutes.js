import {
    searchForUser,
    invertAdvancedStatus,
    changePermissions,
    getUserById, 
    getAllUsers,
    updateUserPassword,
    createUser
} from "../controllers/UserController.js";
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'
import express from 'express';
const router = express.Router();

router.post("/update_password", restrictTo('operator'), requireBody('password', 'newPassword'), updateUserPassword);
router.post("/get_by_id", restrictTo('operator'), requireBody('userId'), getUserById);
router.get("/get_all", getAllUsers);
router.get("/", getAllUsers);
router.get(
    "/search",
    requireQuery('limit', 'first_name', 'last_name'),
    filterQuery('limit', 'offset', 'user_id', 'first_name', 'last_name'),
    searchForUser
);
router.patch("/invert_advanced",
    requireBody("user_id"),
    invertAdvancedStatus);
router.patch("/change_permissions",
    requireBody("user_id", "new_permissions"),
    changePermissions);
router.post("/create",
    requireBody("user"),
    createUser);
router.post("/get_all", restrictTo('operator'), getAllUsers);
export default router;