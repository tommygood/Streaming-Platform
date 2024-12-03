const jwt = require("jsonwebtoken");
const User = require("./../model/user.js");

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
};
