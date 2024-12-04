const express = require("express");
const app = express();
const util = require("./utilities/main.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser()); //解析 HTTP 請求的 cookie
app.use(express.json());
app.use("/api/video", require("./api/video.js"));
app.use("/api/login", require("./api/login.js"));
app.use("/api/user", require("./api/user.js"));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const path = util.getParentPath(__dirname) + "/frontend";
app.use(express.static(path));
