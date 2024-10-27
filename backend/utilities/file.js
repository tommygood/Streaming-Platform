const S3cmd = require("./s3cmd.js");
const s3cmd = new S3cmd();

class File {
  constructor() {}

  async upload(file) {
    const res = await s3cmd.upload(file);
  }

  async download(file) {
    const res = await s3cmd.get(file);
    console.log("res", res);
  }

  async list() {
    const res = await s3cmd.list();
    const data = res.msg.toString();
    console.log("res", data);
    return data;
  }
}

const file = new File();
// example usage
// file.upload('test123.txt');
// file.download('test2.txt');
// file.list();

module.exports = file;
