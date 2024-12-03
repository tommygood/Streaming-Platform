const fileUpload = require("express-fileupload");
const router = require("express").Router();
const file = require("../utilities/file.js"); // 導入 File 類
const path = require("path");
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
    const result = await file.list();
    const videoList = result.split("\n").map((line) => {
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

    res.status(200).json(videoList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error listing files", error: error.toString() });
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
