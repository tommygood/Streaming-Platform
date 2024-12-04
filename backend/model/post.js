const db = require("./conn");

module.exports = {
  getAllPosts: async function () {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM Post";
        const result = await conn.query(sql);
        conn.release();
        return result;
      } catch (e) {
        console.error("Error getting posts: ", e);
        conn.release();
        return null;
      }
    }
  },

  addPost: async function (postData) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql =
          "INSERT INTO Post (uid, postText, postLike, postComment) VALUES (?, ?, 0, 0)";
        const result = await conn.query(sql, [postData.uid, postData.postText]);
        conn.release();
        return result.insertId;
      } catch (e) {
        console.error("Error adding post: ", e);
        conn.release();
        return null;
      }
    }
  },

  updatePost: async function (pid, postData) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql =
          "UPDATE Post SET postText = ?, postComment = ?, uploadTime = ? WHERE postid = ?";
        const result = await conn.query(sql, [
          postData.postText,
          postData.postComment,
          postData.uploadTime,
          postid,
        ]);
        conn.release();
        return result.affectedRows;
      } catch (e) {
        console.error("Error updating post: ", e);
        conn.release();
        return null;
      }
    }
  },

  deletePost: async function (pid) {
    const conn = await db.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "DELETE FROM Post WHERE postid = ?";
        const result = await conn.query(sql, [pid]);
        conn.release();
        return result.affectedRows;
      } catch (e) {
        console.error("Error deleting post: ", e);
        conn.release();
        return null;
      }
    }
  },
};
