import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import apiRoutes from './routes/ApiRoutesRoot.js';

const app = express();

// setup middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// api
app.use('/api', apiRoutes);

// client build
app.use('/', express.static(path.resolve('client/build')));

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

export default app;
