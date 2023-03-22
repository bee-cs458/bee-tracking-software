import express from "express";
import passport from "passport";
const router = express.Router();

// import all api routes here
import counterRoutes from "./CounterRoutes.js";
import assetRoutes from "./AssetRoutes.js";
import categoryRoutes from "./CategoryRoutes.js";
import checkInRoutes from "./CheckInRoutes.js";
import checkoutRoutes from "./CheckoutRoutes.js"
import userRoutes from './UserRoutes.js';
import recordRoutes from './RecordRoutes.js';
import loginRoutes from './LoginRoutes.js';

import { restrictTo } from '../controllers/SecurityController.js'

// our api routes
router.get("/", (req, res) => res.send("Hello World!"));
router.use("/count", counterRoutes);
router.use("/asset", assetRoutes);
router.use("/categories", categoryRoutes);
router.use("/user", userRoutes);
router.use("/checkin", checkInRoutes);
router.use("/checkout", restrictTo("operator"), checkoutRoutes);
router.use("/records", restrictTo("operator"), recordRoutes);
router.use("/login", loginRoutes);

// catch-all for /api/something-not-valid
router.use("/", (req, res, next) =>
  next({
    status: 404,
    message: `API route '${req.method} ${req.url}' is not defined`,
  })
);

export default router;
