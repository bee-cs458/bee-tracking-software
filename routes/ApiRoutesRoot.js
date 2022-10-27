import express from 'express';
const router = express.Router();

// import all api routes here
import counterRoutes from './CounterRoutes.js';
import assetRoutes from './AssetRoutes.js';

// our api routes
router.get("/", (req, res) => res.send("Hello World!"));
router.use("/count", counterRoutes);
router.use("/asset", assetRoutes);

// Test Database Endpoint - demonstration purposes only
/*
import { query } from '../utilities/DatabaseUtilities.js';
router.get("/dbTest", async (req, res) => {

    const result = await query("SELECT * FROM beets_staging.asset");
    res.send(result);

});
*/

// catch-all for /api/something-not-valid
router.use("/", (req, res, next) => next({
    status: 404,
    message: `API route '${req.method} ${req.url}' is not defined`
}));

export default router;
