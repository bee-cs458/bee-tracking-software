import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import { createSchema } from './utilities/DatabaseUtilities.js';
import apiRoutes from './routes/index.js';

// copy from .env to environment
dotenv.config();

// create schema if not exists
await createSchema();

const app = express();

// boilerplate -- what exactly is this doing?
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// run "index.js development" to trigger this flag
const devModeEnabled = (process.argv.includes('development'));

// set to 3000 for prod, 5000 for dev
const PORT = (devModeEnabled ? 5000 : process.env.PORT || 3000);

// back-end
app.use('/api', apiRoutes);

// front-end
if (!devModeEnabled) {
  const buildPath = path.resolve('client/build');

  // make sure client build exists before hosting it
  if (fs.existsSync(buildPath)) {
    app.use('/', express.static(buildPath));
  }
  else {
    app.use('/', (req, res) => res.status(500).send('The folder client/build was not found at runtime.'));
  }
}

// fix for react router
app.get('*', (req, res) => res.sendFile(path.resolve('client/build/index.html')));

// start server
app.listen(PORT, () => {
  console.log(`BEETS listening on port ${PORT}`);
});
