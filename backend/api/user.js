const router = require("express").Router();
const User = require("../model/user.js");
const jwt = require("../utilities/jwt.js");
router.get("/", async function (req, res) {
  try {
    const data = await User.get();
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/self", jwt.verifyLogin, async (req, res) => {
  try {
    const identifier = req.identifier;
    console.log(identifier);
    const data = await User.getSelf(identifier);
    res.json({ data }); // 回傳取得的資料
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
