import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';

import counterRoutes from './routes/CounterRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const devModeEnabled = (process.argv.includes('development'));

// set to 3000 for prod, 5000 for dev
const PORT = (devModeEnabled ? 5000 : process.env.PORT || 3000);

// front-end
if (!devModeEnabled) {
  if (fs.existsSync('client/build')) {
    app.use('/', express.static('client/build'));
  }
  else {
    app.get('/', (req, res) => res.send('The folder client/build was not found at runtime.'));
  }
}

app.use("/api/count", counterRoutes);

app.get('/api', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`BEETS listening on port ${PORT}`);
})
