import pool from './database';

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database!');
    console.log('Connection details:');
    console.log('- Database:', process.env.DB_NAME);
    console.log('- Host:', process.env.DB_HOST);
    console.log('- Port:', process.env.DB_PORT);

    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('Current database time:', result.rows[0].now);

    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    // Close the pool
    await pool.end();
  }
}

testConnection();
