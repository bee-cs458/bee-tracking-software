import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

let pool = null;

export async function createSchema() {
    const schemaPath = path.resolve('schema.sql');
    if (fs.existsSync(schemaPath)) {
        try {
            // read in our schema config
            const statements = fs.readFileSync(schemaPath, "utf8");

            // make a custom connection
            const connection = await getConnection({
                database: undefined,
                multipleStatements: true
            });

            // create schema if it doesn't exist
            await connection.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.DB_NAME};\n` +
                `USE ${process.env.DB_NAME};\n`+ statements)

            // this connection only to be used for creating schema
            connection.end();
            return true;
        }
        catch (err) {
            console.log(`Could not create schema\n${err.stack}`)
            return false;
        }
    }
    return false;
}

async function getConnection(extraConfig) {
    if (pool && !extraConfig) {
        return pool;
    }
    const config = {
        host: process.env.DB_CONNECTION_URL,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        ssl: {
            ca: fs.readFileSync(process.env.CERT_PATH)
        }
    };
    if (extraConfig) {
        return await mysql.createConnection(Object.assign(config, extraConfig));
    }
    pool = await mysql.createPool(config);
    return pool;
}

const connection = null

export async function query(sql, params) {
    try {
        const connection = await getConnection();
        const [results,] = await connection.execute(sql, params);

        if (!results) {
            return [];
        } else {
            return results;
        }

    } catch (error) {
        console.log("Error Querying Database");
        console.log(error.message);
    }
}
