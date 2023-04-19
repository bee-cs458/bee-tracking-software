import {
  searchForUser,
  invertAdvancedStatus,
  changePermissions,
  getUserById,
  getAllUsers,
  updateUserPassword,
  createUser,
  deleteUser,
  editUser,
  editUserProfile,
} from "../controllers/UserController.js";
import {
  requireBody,
  restrictTo,
  requireQuery,
  filterQuery,
} from "../controllers/SecurityController.js";
import express from "express";
const router = express.Router();

router.post(
  "/update_password",
  requireBody("password", "newPassword"),
  updateUserPassword
);
router.post(
  "/get_by_id",
  restrictTo("operator"),
  requireBody("userId"),
  getUserById
);
router.get("/get_all", restrictTo("operator"), getAllUsers);
router.get("/", restrictTo("operator"), getAllUsers);
router.get(
  "/search",
  restrictTo("operator"),
  requireQuery("limit", "first_name", "last_name"),
  filterQuery("limit", "offset", "user_id", "first_name", "last_name"),
  searchForUser
);
router.patch(
  "/invert_advanced",
  restrictTo("owner"),
  requireBody("user_id"),
  invertAdvancedStatus
);
router.patch(
  "/change_permissions",
  restrictTo("owner"),
  requireBody("user_id", "new_permissions"),
  changePermissions
);
router.post("/create", restrictTo("owner"), requireBody("user"), createUser);
router.post("/get_all", restrictTo("operator"), getAllUsers);

router.delete("/:id", restrictTo("owner"), deleteUser);
router.post(
  "/editUser/:oldId",
  restrictTo("owner"),
  requireBody("user_id", "first_name", "last_name", "updatePass"),
  editUser
);
router.post(
  "/editUserProfile/:userId",
  requireBody("first_name", "last_name"),
  editUserProfile
);
export default router;
