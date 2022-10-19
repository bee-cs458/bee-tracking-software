import mysql from 'mysql2/promise';
import fs from 'fs';

let pool = null;

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
