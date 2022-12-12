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

const validateUserAndPass = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password)
      next({
        status: 400,
        message: "Both username and password must be specified!",
      });
    else if (typeof username !== "string" || typeof password !== "string")
      next({
        status: 400,
        message: "Username and password must be strings!",
      });
    else {
      // verified successfully
      next();
    }
  };
  
  const genSaltAndHash = async (req, res, next) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);
  
    // overwrite password with new hash
    req.body.password = hash;
    // done
    next();
  };

// sign up
router.post(
    "/newCredentials",
    // generate salt and hash
    validateUserAndPass,
    genSaltAndHash,
    // make sure all required params are there
    requireBody("username", "password", "first_name", "last_name", "user_id", "permissions", "advanced"),
    createUser
  );


router.post("/update_password", restrictTo('operator'), requireBody('password', 'newPassword'), updateUserPassword);
router.post("/get_by_id", restrictTo('operator'), requireBody('userId'), getUserById);
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
router.post("/create",
    restrictTo('owner'),
    requireBody("user"),
    createUser);
router.post("/get_all", restrictTo('operator'), getAllUsers);
export default router;