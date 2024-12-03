const mariadb = require("mariadb");

const pool = mariadb.createPool({
  connectionLimit: 5,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "20020124e",
  database: "s3",
  acquireTimeout: 30000, // 增加超時時間
});

// async function testConnection() {
//   try {
//     const conn = await pool.getConnection();
//     console.log("Connected to the database!");
//     conn.release(); // 釋放連接
//   } catch (err) {
//     console.error("Error connecting to the database:", err);
//   } finally {
//     pool.end();
//   }
// }

module.exports = {
  // return connection of db
  getDBConnection: async function () {
    try {
      const conn = await pool.getConnection();
      return conn;
    } catch (e) {
      console.error("error getting db connection : ", e);
      return null;
    }
  },

  // close connection of db
  closeDBConnection: function (conn) {
    try {
      conn.release();
      return true;
    } catch (e) {
      console.error("error closing db connection : ", e);
      return false;
    }
  },
};
