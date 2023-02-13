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

import { restrictTo } from '../controllers/SecurityController.js'

// our api routes
router.get("/", (req, res) => res.send("Hello World!"));
router.use("/count", counterRoutes);
router.use("/asset", assetRoutes);
router.use("/categories", categoryRoutes);
router.use("/user", userRoutes);
router.use("/checkin", 
//restrictTo("operator"), 
checkInRoutes);
router.use("/checkout", restrictTo("operator"), checkoutRoutes);
router.use("/records", restrictTo("operator"), recordRoutes);
// router.use("/user", UserRoutes);

// Test Database Endpoint - demonstration purposes only
/*
import { query } from '../utilities/DatabaseUtilities.js';
router.get("/dbTest", async (req, res) => {

    const result = await query("SELECT * FROM beets_staging.asset");
    res.send(result);

});
*/

// login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/login/success",
    failureRedirect: "/api/login/failure",
  })
);

// logout
router.post('/logout', async (req, res, next) => {
    await req.logout().then(res.send("Logged out")).catch(next);
});


router.get("/login/success", (req, res) => {
  delete req.user?.password;
  res.send(req.user);
});
router.get("/login/failure", (req, res) =>
  res.status(401).send("authentication failure")
);

// catch-all for /api/something-not-valid
router.use("/", (req, res, next) =>
  next({
    status: 404,
    message: `API route '${req.method} ${req.url}' is not defined`,
  })
);

export default router;
