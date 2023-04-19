require("dotenv").config(); // Load environment variables from .env file

import FtpDeploy from "ftp-deploy";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: __dirname + "/client/build", // Path to your build directory
  remoteRoot: "/htdocs", // Remote root directory on FTP server
  include: ["*", "**/*"], // Files and directories to include
  exclude: [], // Files and directories to exclude
  deleteRemote: true, // Whether to delete remote files before uploading
  forcePasv: true, // Whether to force passive mode FTP
};

console.log("Deploying to FTP...");
console.log("Config:", config);

ftpDeploy.deploy(config, function (err) {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Deployment successful!");
  }
});
