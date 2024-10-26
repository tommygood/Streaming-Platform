// s3cmd module for js
const { exec } = require("child_process");
class s3cmd {
  constructor() {
    this.bucket_name = "aws-streaming-platform";
  }

  // upload file to s3
  async upload(file) {
    const result = await this.createProcess([
      "put",
      file,
      `s3://${this.bucket_name}`,
    ]);
    return result;
  }

  // list all files in bucket
  async list() {
    const result = await this.createProcess(["ls", `s3://${this.bucket_name}`]);
    return result;
  }

  // get file from s3 by filename
  async get(file) {
    const result = await this.createProcess([
      "get",
      `s3://${this.bucket_name}/${file}`,
    ]);
    return result;
  }
  //for linux
  // getS3Process(params) {
  // 	const script = "s3cmd";
  // 	const spawn = require("child_process").spawn;
  // 	console.log(script, params);
  // 	return spawn(script, params);
  // }

  //for windows
  getS3Process(params) {
    const script =
      "C:/Users/user/AppData/Local/Programs/Python/Python313/Scripts/s3cmd.bat"; // s3cmd
    const command = `${script} ${params.join(" ")}`;
    console.log(`Executing command: ${command}`);

    return exec(command);
  }

  async createProcess(params) {
    const process = this.getS3Process(params);
    let result = [];

    return new Promise((resolve, reject) => {
      // 包裝成 Promise

      process.stderr.on("data", (data) => {
        console.error(`stderr: ${data.toString()}`);
        resolve({ suc: false, msg: data.toString() }); // failed to create container, return the error msg
      });

      process.on("exit", (code) => {
        //console.log(`child process exited with code ${code}`);
        if (code !== 0) {
          reject(new Error(`child process exited with code ${code}`)); // 非 0 退出代碼表示錯誤
        } else {
          resolve({ suc: true, msg: result });
        }
      });

      process.on("error", (err) => {
        console.error(err);
        reject(err); // 子進程啟動失敗
      });

      process.stdout.on("data", (data) => {
        try {
          //resolve({suc : true, msg : data});
          result.push(data);
        } catch (e) {
          console.error(e);
          reject(err); // 子進程啟動失敗
        }
      });
    });
  }
}

module.exports = s3cmd;
