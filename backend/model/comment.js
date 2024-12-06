const db = require("./conn");

module.exports = {
  getAllComments: async function () {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM comment";
        const result = await db.query(sql);
        conn.release();
        return result;
      } catch (e) {
        console.error("Error getting comments: ", e);
        conn.release();
        return null;
      }
    }
  },

  getVideoComments: async function (vid) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM comment WHERE vid = ?";
        const result = await db.query(sql, [vid]);
        conn.release();
        return result;
      } catch (e) {
        console.error("Error getting video comments: ", e);
        conn.release();
        return null;
      }
    }
  },

  getPostComments: async function (postid) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM comment WHERE postid = ?";
        const result = await conn.query(sql, [postid]);
        conn.release();
        return result;
      } catch (e) {
        console.error("Error getting post comments: ", e);
        conn.release();
        return null;
      }
    }
  },

  addComment: async function (identifier, commentData) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql =
          "INSERT INTO comment (postid, vid,uid, content) VALUES (?, ?, ?, ?)";
        const result = await conn.query(sql, [
          commentData.postid,
          commentData.vid,
          identifier,
          commentData.content,
        ]);
        conn.release();
        return result.insertId;
      } catch (e) {
        console.error("Error adding comment: ", e);
        conn.release();
        return null;
      }
    }
  },

  updateComment: async function (cid, commentData) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "UPDATE comment SET content = ? WHERE cid = ?";
        const result = await conn.query(sql, [commentData.content, cid]);
        conn.release();
        return result.affectedRows;
      } catch (e) {
        console.error("Error updating comment: ", e);
        conn.release();
        return null;
      }
    }
  },

  deleteComment: async function (cid) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "DELETE FROM comment WHERE cid = ?";
        const result = await conn.query(sql, [cid]);
        conn.release();
        return result.affectedRows;
      } catch (e) {
        console.error("Error deleting comment: ", e);
        conn.release();
        return null;
      }
    }
  },
};
