import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import counterRoutes from './routes/CounterRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.API_PORT || process.env.PORT || 5000;

app.use("/api/count", counterRoutes);

app.get('/api', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`beets-api listening on port ${PORT}`);
})
