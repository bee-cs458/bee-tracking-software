import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

let pool = null;

export async function createSchema() {
    const schemaPath = path.resolve('schema.sql');
    if (fs.existsSync(schemaPath)) {
        try {
            const queryStatements = fs.readFileSync(schemaPath, "utf8").split(';');
            const queryPromises = [];
            const pool = await getPool();
            for (const statement of queryStatements) {
                // ensure not just whitespace
                if (statement.trim()) {
                    queryPromises.push(pool.query(statement))
                }
            }
            await Promise.all(queryPromises);
            return true;
        }
        catch (err) {
            console.log(`Could not create schema\n${err.message}`)
            return false;
        }
    }
    return false;
}

async function getPool() {
    if (pool) {
        return pool;
    }
    const config = {
        host: process.env.DB_CONNECTION_URL,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            ca: fs.readFileSync(process.env.CERT_PATH)
        }
    };
    pool = mysql.createPool(config);
    return pool;
}

const connection = null

export async function query(sql, params) {
    try {
        const pool = await getPool();
        const [results,] = await pool.execute(sql, params);

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
