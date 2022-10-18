import mysql from 'mysql2';

export async function query(sql, params) {
    const connection = await mysql.createConnection({
        host: process.env.DB_CONNECTION_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    const [results,] = await connection.execute(sql, params);

    if (!results) {
        return [];
    } else {
        return results;
    }
}