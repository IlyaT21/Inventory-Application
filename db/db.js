const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventory_application",
  password: "postgres",
  port: 5432,
});

pool
  .connect()
  .then(async (client) => {
    console.log("Connected to PostgreSQL database!");

    try {
      // Insert 'Uncategorized'
      await client.query(`
        INSERT INTO categories (name)
        VALUES ('Uncategorized')
        ON CONFLICT (name) DO NOTHING
      `);

      console.log(
        "'Uncategorized' category inserted (if not already present)."
      );
    } catch (err) {
      console.error("Error inserting category:", err.stack);
    } finally {
      client.release();
    }
  })
  .catch((err) => console.error("Connection error", err.stack));

module.exports = pool;
