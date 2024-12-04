const conn = require("./conn");
module.exports = {
  get: async function () {
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM video";
        const result = await conn.query(sql);
        conn.release();
        return result;
      } catch (e) {
        console.error("Error getting users : ", e);
        conn.release();
        return null;
      }
    }
  },
  getVideo: async function (vid) {
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM video WHERE vid = ?";
        const result = await conn.query(sql, [vid]);
        conn.release();
        return result[0];
      } catch (e) {
        console.error("Error getting video: ", e);
        conn.release();
        return null;
      }
    }
  },
  getUserVideos: async function (uid) {
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM video WHERE uid = ?";
        const result = await conn.query(sql, [uid]);
        conn.release();
        return result;
      } catch (e) {
        console.error("Error getting user videos: ", e);
        conn.release();
        return null;
      }
    }
  },
  addVideo: async function (videoData) {
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql =
          "INSERT INTO video (uid,views,viewNumber,videoTitle,likeNumber,videoDescription) VALUES (?, 0, 0, ?, 0,?)";
        const result = await conn.query(sql, [
          identifier,
          videoData.title,
          videoData.user_id,
          videoData.size,
          videoData.date,
        ]);
        conn.release();
        return result.insertId;
      } catch (e) {
        console.error("Error adding video: ", e);
        conn.release();
        return null;
      }
    }
  },
  updateVideo: async function (vid, videoData) {
    const conn = await conn.getDBConnection();
    if (conn == null) {
      return null;
    } else {
      try {
        const sql =
          "UPDATE video SET videoTitle = ?, videoDescription = ?, WHERE vid = ?";
        const result = await conn.query(sql, [
          videoData.videoTitle,
          videoData.videoDescription,
          vid,
        ]);
        conn.release();
        return result.affectedRows;
      } catch (e) {
        console.error("Error updating video: ", e);
        conn.release();
        return null;
      }
    }
  },
};
