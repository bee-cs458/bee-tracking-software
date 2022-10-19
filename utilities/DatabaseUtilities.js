import mysql from 'mysql2/promise';
import fs from 'fs';

export async function query(sql, params) {
    const connection = await mysql.createConnection({
        host: process.env.DB_CONNECTION_URL,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            ca: fs.readFileSync(process.env.CERT_PATH)
        }
    });

    try {
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