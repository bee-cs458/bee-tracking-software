import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import { createSchema } from './utilities/DatabaseUtilities.js';
import apiRoutes from './routes/index.js';
import passport from './utilities/passport-local-auth.js';

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

// auth session setup
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400,
    secure: !devModeEnabled
  }
}));

app.use(passport.initialize());
app.use(passport.session());

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
