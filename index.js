import dotenv from "dotenv";
import AWS from "aws-sdk";
import fs from "node:fs";
import path from "node:path";

import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

dotenv.config({ path: "./env.local" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

// get the bucket name from the url
const getBucketNameAndFileName = (url) => {
  const urlParts = url.split("/");
  const bucketName = urlParts[2];
  const fileName = urlParts.slice(3).join("/");
  return { bucketName, fileName };
};

console.log("Hello World!");
console.log("*****************************");
const { bucketName, fileName } = getBucketNameAndFileName(process.env.S3_URL);
console.log(`Downloading ${fileName} from ${bucketName}`);
// get the file from s3
const getFileFromStream = (fileName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };
  return s3.getObject(params).createReadStream();
};
console.log("Downloading file...");
const s3FileStream = getFileFromStream(fileName).pipe(
  fs.createWriteStream(__dirname + "/" + fileName)
);
// get downloaded file and pipe it to stdout
s3FileStream.on("finish", () => {
  fs.createReadStream(__dirname + "/" + fileName).pipe(output);
});

console.log("File downloaded");
console.log("File is being piped to stdout");
console.log("*****************************");
