const db = require("./conn");

module.exports = {
  get: async function () {
    const connection = await db.getDBConnection();
    if (connection == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM video";
        const result = await connection.query(sql);
        connection.release();
        return result;
      } catch (e) {
        console.error("Error getting videos: ", e);
        connection.release();
        return null;
      }
    }
  },

  getVideo: async function (vid) {
    const connection = await db.getDBConnection();
    if (connection == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM video WHERE vid = ?";
        const result = await connection.query(sql, [vid]);
        connection.release();
        return result[0];
      } catch (e) {
        console.error("Error getting video: ", e);
        connection.release();
        return null;
      }
    }
  },

  getUserVideos: async function (uid) {
    const connection = await db.getDBConnection();
    if (connection == null) {
      return null;
    } else {
      try {
        const sql = "SELECT * FROM video WHERE uid = ?";
        const result = await connection.query(sql, [uid]);
        connection.release();
        return result;
      } catch (e) {
        console.error("Error getting user videos: ", e);
        connection.release();
        return null;
      }
    }
  },

  addVideo: async function (videoData) {
    const connection = await db.getDBConnection();
    if (connection == null) {
      return null;
    } else {
      try {
        const sql =
          "INSERT INTO video (uid, videoTitle, videoDescription) VALUES (?, ?, ?)";
        const result = await connection.query(sql, [
          videoData.uid,
          videoData.videoTitle,
          videoData.videoDescription,
        ]);
        connection.release();
        return { success: true };
      } catch (e) {
        console.error("Error adding video: ", e);
        connection.release();
        return null;
      }
    }
  },

  updateVideo: async function (vid, videoData) {
    const connection = await db.getDBConnection();
    if (connection == null) {
      return null;
    } else {
      try {
        const sql =
          "UPDATE video SET videoTitle = ?, videoDescription = ? WHERE vid = ?";
        const result = await connection.query(sql, [
          videoData.videoTitle,
          videoData.videoDescription,
          vid,
        ]);
        connection.release();
        return result.affectedRows;
      } catch (e) {
        console.error("Error updating video: ", e);
        connection.release();
        return null;
      }
    }
  },
};
