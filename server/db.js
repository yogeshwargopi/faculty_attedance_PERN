const { Client } = require("pg");

const client = new Client({
  user: "yogesh",
  host: "localhost", // Correct the typo here
  database: "leave-app",
  password: "yogesh",
  port: 5432, // PostgreSQL default port
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((error) => console.error("Error connecting to PostgreSQL:", error));

module.exports = client;
