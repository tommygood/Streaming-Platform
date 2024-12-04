const mariadb = require("mariadb");

const pool = mariadb.createPool({
  connectionLimit: 5,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "20020124e",
  database: "s3",
  waitForConnections: true,
  dateStrings: true, // 禁用日期自動轉換
});

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
