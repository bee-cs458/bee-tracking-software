import express from "express";
import { checkLoginInfo } from "../controllers/UserController.js";

const router = express.Router();

router.get("/verifyLogin", checkLoginInfo);

export default router;