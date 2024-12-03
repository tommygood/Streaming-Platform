const express = require("express");
const app = express();
const port = 3000;
const util = require("./utilities/main.js");
app.use(express.json());
app.use("/api/video", require("./api/video.js"));
app.use("/api/login", require("./api/login.js"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const path = util.getParentPath(__dirname) + "/frontend";
app.use(express.static(path));
