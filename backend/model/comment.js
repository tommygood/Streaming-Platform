const conn = require("./conn");

module.exports = {
  getAllComments: async function () {
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM comments";
        const result = await conn.query(sql);
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
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM comments WHERE vid = ?";
        const result = await conn.query(sql, [vid]);
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
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM comments WHERE postid = ?";
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

  addComment: async function (commentData) {
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql =
          "INSERT INTO comments (postid, vid,uid, commentText) VALUES (?, ?, ?, ?)";
        const result = await conn.query(sql, [
          commentData.postid,
          commentData.vid,
          commentData.uid,
          commentData.commentText,
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
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "UPDATE comments SET commentText = ? WHERE cid = ?";
        const result = await conn.query(sql, [commentData.commentText, cid]);
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
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "DELETE FROM comments WHERE cid = ?";
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
