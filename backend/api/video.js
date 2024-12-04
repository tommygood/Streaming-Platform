const fileUpload = require("express-fileupload");
const router = require("express").Router();
const file = require("../utilities/file.js"); // 導入 File 類
const path = require("path");
const video = require("../model/video.js");
const fs = require("fs").promises;

router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
router.post("/upload", async (req, res) => {
  if (!req.files || !req.files.video) {
    return res
      .status(400)
      .json({ success: false, message: "No files were uploaded." });
  }

  const sampleFile = req.files.video;

  // 使用 UUID 生成唯一文件名，保留文件擴展名(不知道為什麼不能附上去)
  const uploadDir = path.join(__dirname, "tmp");
  const uploadPath = path.join(uploadDir, sampleFile.name);

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      console.error("文件移動失敗:", err);
      return res.status(500).json({
        success: false,
        message: "File upload failed.",
        error: err.message,
      });
    }
    res.json({
      success: true,
      message: "File uploaded successfully!",
      originalFileName: sampleFile.name,
    });
  });
  await file.upload(uploadPath);
  deleteFileWithDelay(uploadPath);
});

router.get("/list", async (req, res) => {
  try {
    const sqlData = await video.get();

    const s3Result = await file.list();
    const s3VideoList = s3Result.split("\n").map((line) => {
      const parts = line.trim().split(/\s+/);
      const s3Url = parts[3];
      const httpUrl = convertS3UrlToHttp(s3Url);

      return {
        date: `${parts[0]} ${parts[1]}`,
        size: parts[2],
        url: httpUrl,
        title: httpUrl.split("/").pop(),
      };
    });

    // 合併 SQL 和 S3 的影片資料
    const combinedData = sqlData.map((sqlVideo) => {
      const s3Video = s3VideoList.find(
        (s3Video) => s3Video.title === sqlVideo.videoTitle
      );
      return {
        vid: sqlVideo.vid,
        uid: sqlVideo.uid,
        view: sqlVideo.view,
        viewNumber: sqlVideo.viewNumber,
        videoTitle: sqlVideo.videoTitle,
        likeNumber: sqlVideo.likeNumber,
        videoDescription: sqlVideo.videoDescription,
        videoDate: sqlVideo.videoDate,
        s3Url: s3Video ? s3Video.url : null,
        s3Date: s3Video ? s3Video.date : null,
        s3Size: s3Video ? s3Video.size : null,
      };
    });

    res.status(200).json(combinedData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error listing files", error: error.toString() });
  }
});

router.get("/:vid", async (req, res) => {
  try {
    const vid = req.params.vid;
    const video = await video.getVideo(vid);
    res.status(200).json(video);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving video", error: error.toString() });
  }
});

// GET /list/:uid
router.get("/list/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;

    // 從 SQL 獲取特定用戶的所有影片資料
    const userVideos = await video.getUserVideos(uid);

    // 從 S3 獲取影片列表
    const s3Result = await file.list();
    const s3VideoList = s3Result.split("\n").map((line) => {
      const parts = line.trim().split(/\s+/);
      const s3Url = parts[3];
      const httpUrl = convertS3UrlToHttp(s3Url);

      return {
        date: `${parts[0]} ${parts[1]}`,
        size: parts[2],
        url: httpUrl,
        title: httpUrl.split("/").pop(),
      };
    });

    // 合併 SQL 和 S3 的影片資料
    const combinedData = userVideos.map((sqlVideo) => {
      const s3Video = s3VideoList.find(
        (s3Video) => s3Video.title === sqlVideo.videoTitle
      );
      return {
        vid: sqlVideo.vid,
        uid: sqlVideo.uid,
        view: sqlVideo.view,
        viewNumber: sqlVideo.viewNumber,
        videoTitle: sqlVideo.videoTitle,
        likeNumber: sqlVideo.likeNumber,
        videoDescription: sqlVideo.videoDescription,
        videoDate: sqlVideo.videoDate,
        s3Url: s3Video ? s3Video.url : null,
        s3Date: s3Video ? s3Video.date : null,
        s3Size: s3Video ? s3Video.size : null,
      };
    });

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user's videos",
      error: error.toString(),
    });
  }
});

// POST /
router.post("/", async (req, res) => {
  try {
    const videoData = req.body;
    const newVideo = await video.addVideo(videoData); // 假設有一個 addVideo 方法
    res.status(201).json(newVideo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding video", error: error.toString() });
  }
});

// PUT /:vid
router.put("/:vid", async (req, res) => {
  try {
    const vid = req.params.vid;
    const videoData = req.body;
    const updatedVideo = await video.updateVideo(vid, videoData); // 假設有一個 updateVideo 方法
    res.status(200).json(updatedVideo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating video", error: error.toString() });
  }
});

function convertS3UrlToHttp(s3Url) {
  const bucketName = "aws-streaming-platform";
  const fileKey = s3Url.replace(`s3://${bucketName}/`, "");
  return `https://${bucketName}.s3.amazonaws.com/${fileKey}`;
}

async function deleteFileWithDelay(filePath) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    await fs.unlink(filePath);
    console.log("file deleted successfully");
  } catch (err) {
    console.error("file deleted failed:", err);
  }
}
module.exports = router;
