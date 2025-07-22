const sequelize = require("./db");

(async () => {
    try {
      // Test the connection
      await sequelize.authenticate();
      console.log('Connection established successfully.');
  
      // Drop the database
      const dbName = process.env.DB_NAME; // Replace with the database name you want to drop
      await sequelize.query(`DROP DATABASE IF EXISTS "${dbName}"`);
      console.log(`Database "${dbName}" dropped successfully.`);
    } catch (error) {
      console.error('Error dropping database:', error.message);
    } finally {
      // Close the connection
      await sequelize.close();
    }
  })();