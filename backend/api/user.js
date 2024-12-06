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

router.put("/update", jwt.verifyLogin, async (req, res) => {
  try {
    const identifier = req.identifier;
    const userData = req.body;
    userData.age = countAge(userData.birthday);
    const data = await User.updateSelf(identifier, userData);
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

function countAge(birthday) {
  const [birthYear, birthMonth, birthDay] = birthday.split("-").map(Number);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  let age = currentYear - birthYear;

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return age;
}
module.exports = router;
