const { Pool } = require("pg");

// PostgreSQL connection configuration
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "inventory_application",
  password: "postgres",
  port: 5432,
});

// Test the connection
pool
  .connect()
  .then(async (client) => {
    console.log("Connected to PostgreSQL database!");

    try {
      // Insert 'Uncategorized' if it doesn't already exist
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
      client.release(); // Release the client back to the pool
    }
  })
  .catch((err) => console.error("Connection error", err.stack));

// Export the pool to use in other files
module.exports = pool;
