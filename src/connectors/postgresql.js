const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_DB_USER,
    host: process.env.POSTGRES_DB_HOST,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: process.env.POSTGRES_DB_PORT,
});

const getPgClient = async () => {
    const client = await pool.connect();
    return client;
};

const exec = async (client, query) => {
    try {
        const res = await client.query(query);
        return res;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
};

module.exports = { getPgClient, exec };
