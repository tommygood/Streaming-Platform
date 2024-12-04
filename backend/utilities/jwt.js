const jwt = require("jsonwebtoken");
const jwt_key = "secret";
const User = require("./../model/user.js");
function verifyJwtToken(token) {
  try {
    const result = jwt.verify(token, jwt_key);
    return { suc: true, data: result };
  } catch (e) {
    console.error(e);
    return { suc: false, data: null };
  }
}
module.exports = {
  jwt_key: "secret",

  signJwtToken: function (data) {
    try {
      const result = jwt.sign(
        { data, exp: Math.floor(Date.now() / 1000) + 600 * 15 },
        this.jwt_key
      );
      return result;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  verifyLogin: async function (req, res, next) {
    const token = req.cookies.token;
    const result = verifyJwtToken(token);
    if (result.suc) {
      // set identifier in req
      req.identifier = result.data.data;
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  },
};
