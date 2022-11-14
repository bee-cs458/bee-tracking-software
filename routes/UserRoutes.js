import {
    updateUser
} from "../controllers/UserController";

import { requireBody, restrictTo, requireQuery, filterQuery } from '../controllers/SecurityController.js'

router.post("/:id", restrictTo('operator'), requireBody('username', 'password', 'newPassword'), updateUser);