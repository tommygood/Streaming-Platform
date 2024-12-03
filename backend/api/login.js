const router = require("express").Router();
const oauth = require("../model/oauth.js");
const User = require("../model/user.js");
router.get("/sso", async function (req, res) {
  try {
    await oauth.run(req, res);
  } catch (e) {
    console.log(e);
    res.json({ result: "error" });
  }
});

router.get("/callback", async function (req, res) {
  try {
    const result = await oauth.callback(req, res);
    result.user_info.birthday = convertToGregorianDate(
      result.user_info.birthday
    );
    result.user_info.age = countAge(result.user_info.birthday);
    User.insert(result.user_info);
  } catch (e) {
    console.error(e);
  }
});

// change yyymmdd for yyyy-mm-dd
function convertToGregorianDate(rocDate) {
  const rocYear = parseInt(rocDate.substring(0, 3));
  const month = rocDate.substring(3, 5);
  const day = rocDate.substring(5, 7);

  const gregorianYear = rocYear + 1911;

  const gregorianDate = `${gregorianYear}-${month}-${day}`;

  return gregorianDate;
}

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
