import {
    updateUser
} from "../controllers/UserController";
import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'
import router from "./AssetRoutes";

router.post("/:id", restrictTo('operator'), requireBody('username', 'password', 'newPassword'), updateUser);

export default router;