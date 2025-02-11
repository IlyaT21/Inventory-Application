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
  .then((client) => {
    console.log("Connected to PostgreSQL database!");
    client.release(); // Release the client back to the pool
  })
  .catch((err) => console.error("Connection error", err.stack));

// Export the pool to use in other files
module.exports = pool;
