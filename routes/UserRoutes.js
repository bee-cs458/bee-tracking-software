import {
    updateUserPassword, getUserById
} from "../controllers/UserController.js";
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'
import express from 'express';
const router = express.Router();

router.post("/update_password", restrictTo('operator'), requireBody('password', 'newPassword'), updateUserPassword);
router.post("/get_by_id", restrictTo('operator'), requireBody('userId'), getUserById);
export default router;