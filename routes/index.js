import express from 'express';
import { query } from '../utilities/DatabaseUtilities.js'
const router = express.Router();

// import all api routes here
import counterRoutes from './CounterRoutes.js'

// our api routes
router.get("/", (req, res) => res.send("Hello World!"));
router.use("/count", counterRoutes);

// Test Database Endpoint - demonstration purposes only
router.get("/dbTest", async (req, res) => {

    const result = await query("SELECT * FROM beets_staging.asset");
    res.send(result);

});

// catch-all for /api/something-not-valid
router.use("/", (req, res) => res.status(404).send(`API route ${req.url} is not defined`));

export default router;
