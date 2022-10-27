import app from './app.js';
import dotenv from 'dotenv';
import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import { createSchema } from './utilities/DatabaseUtilities.js';

dotenv.config();

prefix.reg(log);
prefix.apply(log);

log.setLevel(process.env.NODE_ENV === "development" ? 'trace' : 'info');

// try to create schema
await createSchema().then(
    () => log.info("Successfully created schema"),
    (reason) => {
        log.error(`FAILED to create schema: ${reason.message}`)
        log.trace(reason.stack);
    }
);

// use 5000 for development
const PORT = process.env.NODE_ENV === "development" ? 5000 : (process.env.PORT ?? 3000);

// start server
app.listen(PORT, () => {
    log.info(`BEETS listening on port ${PORT}`);
});
