import express from 'express';
const router = express.Router();

// import all api routes here
import counterRoutes from './CounterRoutes.js'

// our api routes
router.get("/", (req, res) => res.send("Hello World!"));
router.use("/count", counterRoutes);

// catch-all for /api/something-not-valid
router.use("/", (req, res) => res.status(404).send(`API route ${req.url} is not defined`));

export default router;
