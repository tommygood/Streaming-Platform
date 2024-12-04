const db_conn = require("./conn");

module.exports = {
  insert: async function (user_info) {
    const conn = await db_conn.getDBConnection();
    // console.log(user_info);
    if (conn == null) {
      return false;
    } else {
      try {
        // insert user info into db, if user exists, then update user info
        const sql =
          "INSERT INTO `User` (`uid`, `name`, `age`, `gender`, `birthday`) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `name` = ? ;";
        await conn.query(sql, [
          user_info.identifier,
          user_info.chineseName,
          user_info.age,
          user_info.gender,
          user_info.birthday,
          user_info.chineseName,
        ]);
        db_conn.closeDBConnection(conn);
        return true;
      } catch (e) {
        console.error("error inserting log : ", e);
        conn.release();
        return false;
      }
    }
  },

  // get all users
  get: async function () {
    const conn = await db_conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * from User;";
        const result = await conn.query(sql);
        db_conn.closeDBConnection(conn);
        return result;
      } catch (e) {
        console.error("error getting user : ", e);
        conn.release();
        return null;
      }
    }
  },

  // get user self info by identifier
  getSelf: async function (identifier) {
    const conn = await db_conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM `User` WHERE `uid` = ?;";
        const result = await conn.query(sql, [identifier]);
        db_conn.closeDBConnection(conn);
        return result[0];
      } catch (e) {
        console.error("error getting user self info : ", e);
        conn.release();
        return null;
      }
    }
  },

  // check if user status is valid
  isValid: async function (identifer) {
    const conn = await db_conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql =
          "SELECT COUNT(*) FROM User WHERE identifier = ? AND status = 1;";
        const result = await conn.query(sql, [identifer]);
        db_conn.closeDBConnection(conn);
        if (result[0]["COUNT(*)"] >= 1) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.error("error getting user : ", e);
        conn.release();
        return null;
      }
    }
  },
};
