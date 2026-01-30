const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

pool.on("error", (err) => {
    console.error("Pool error:", err);
});

const initializeDatabase = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_messages_timestamp
      ON messages(timestamp DESC);
    `);

        console.log("Database initialized");
    } catch (error) {
        console.error("Database init error:", error);
    }
};

module.exports = {
    pool,
    initializeDatabase,
};
