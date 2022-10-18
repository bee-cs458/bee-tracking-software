import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const devModeEnabled = (process.argv.includes('development'));

// set to 3000 for prod, 5000 for dev
const PORT = (devModeEnabled ? 5000 : process.env.PORT || 3000);

// back-end
app.use('/api', apiRoutes);

// front-end
if (!devModeEnabled) {
  const buildPath = path.resolve('client/build');
  // make sure client build exists
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
