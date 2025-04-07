import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client.connect();

async function query(query: string, values?: any[]) {
  const { rows } = await client.query(query, values);
  return rows;
}

export default { query };
