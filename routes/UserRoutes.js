import {
    searchForUser,
    invertAdvancedStatus,
    changePermissions,
    getUserById, 
    getAllUsers,
    updateUserPassword,
    createUser,
} from "../controllers/UserController.js";
import { requireQuery, requireBody, filterQuery, restrictTo } from '../controllers/SecurityController.js'
import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();

const checkOldPassword = (key = "password") => async (req, res, next) => {
  if (
    bcrypt.compare(req.body?.[key], req.user.password) || 
    (req.user.password === req.body?.[key] && typeof req.user.password === "string"))
  {
    next();
  }
  else {
    next({
      status: 401,
      message: "Old password was incorrect or could not be verified!"
    })
  }
}

const encrypt = async (pwd) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
}

// sign up
router.post(
    "/create",
    requireBody("user"),
    // salt and hash
    async (req, res, next) => {
        if (!req.body.user.password && req.body.user.permissions > 0) {
            next({
                status: 400,
                message: "User's password is required!"
            });
            return;
        }
        // overwrite password with new hash
        req.body.user.password = await encrypt(req.body.user.password);
        // done
        next();
    },
    createUser
  );


router.post(
  "/update_password",
  restrictTo('operator'),
  // generate salt and hash
  requireBody('password', 'newPassword'),
  // check old password
  checkOldPassword('password'),
  // salt and hash
  async (req, res, next) => {
    // overwrite password with new hash
    req.body.newPassword = await encrypt(req.body.newPassword);
    // done
    next();
  },
  updateUserPassword
);

router.post(
  "/get_by_id",
  restrictTo('operator'),
  requireBody('userId'),
  getUserById
);
router.get("/get_all", getAllUsers);
router.get("/", getAllUsers);
router.get(
    "/search",
    restrictTo('operator'),
    requireQuery('limit', 'first_name', 'last_name'),
    filterQuery('limit', 'offset', 'user_id', 'first_name', 'last_name'),
    searchForUser
);
router.patch("/invert_advanced",
    restrictTo('operator'),
    requireBody("user_id"),
    invertAdvancedStatus);
router.patch("/change_permissions",
    restrictTo('owner'),
    requireBody("user_id", "new_permissions"),
    changePermissions);

router.post("/get_all", restrictTo('operator'), getAllUsers);
export default router;