import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import log from 'loglevel';

import apiRoutes from './routes/ApiRoutesRoot.js';
import passport from './utilities/passport-local-auth.js';

const app = express();

// setup middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// auth session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400,
    secure: process.env.NODE_ENV !== "development"
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// api
app.use('/api', apiRoutes);

// client build
app.use('/', express.static(path.resolve('client/build')));

// redirect to client
app.get('*', (req, res) => res.sendFile(path.resolve('client/build/index.html')));

// error handler
app.use((err, req, res, next) => {
  log.error(err.stack ?? err.message ?? err);
  res.status(err.status ?? 500).send({
    result: [],
    message: err.message ?? "Unknown error!"
  });
})

export default app;
