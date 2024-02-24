const cron = require("node-cron");
const db = require("./your-database-module"); // Import your database module

cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();
    const expiryDate = new Date(
      currentDate.getTime() - 10 * 24 * 60 * 60 * 1000
    ); // Subtract 10 days

    // Delete expired leave applications
    const result = await db.query(
      "DELETE FROM leave_application WHERE expiry_date <= $1 RETURNING *;",
      [expiryDate]
    );

    console.log(`Deleted ${result.rowCount} expired leave applications.`);
  } catch (error) {
    console.error("Error deleting expired leave applications:", error);
  }
});
