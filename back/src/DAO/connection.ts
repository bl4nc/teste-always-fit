import { createPool, Pool } from "mysql2/promise";

export const pool = createPool({
    host: process.env.BD_HOST ?? 'localhost',
    user: process.env.BD_USER ?? 'user',
    database: process.env.DB_NAME ?? 'pass',
    password: process.env.BD_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000,
    queueLimit: 0,
})