import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import { createSchema } from './utilities/DatabaseUtilities.js';
import apiRoutes from './routes/ApiRoutesRoot.js';

dotenv.config();
const devModeEnabled = (process.argv.includes('development'));
const PORT = (devModeEnabled ? 5000 : process.env.PORT || 3000);

await createSchema();

const app = express();

// setup middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// api
app.use('/api', apiRoutes);

// host the frontend
if (!devModeEnabled) {
  const buildPath = path.resolve('client/build');
  app.use('/', express.static(buildPath));
}

// redirect to client
app.get('*', (req, res) => res.sendFile(path.resolve('client/build/index.html')));

// error handler
app.use((err, req, res, next) => {
  console.log(err.stack ?? err.message ?? err);
  res.status(err.status ?? 500).send({
    result: [],
    message: err.message ?? "Unknown error!"
  });
})

// start server
app.listen(PORT, () => {
  console.log(`BEETS listening on port ${PORT}`);
});


export default app;
