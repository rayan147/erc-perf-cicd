import * as readline from 'node:readline/promises';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import fs from 'node:fs';
import path from 'node:path';

import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:"./env.local"});

export const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const region = process.env.AWS_DEFAULT_REGION;

const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region,
});

// ask the url to provide a valid s3 url
const readlineInterface = readline.createInterface({ input, output });
const getUrlFromUser = await readlineInterface.question('Enter the s3 url: ');

// is the url valid?
const s3Regex = /^s3:\/\/([^\/]+)\/(.+)$/;
const url = getUrlFromUser.match(s3Regex);
if (!url) {
    throw new Error('Invalid s3 url');
}

const bucketName = url[1];
const fileName = url[2];

// get the file from s3
const getFileFromStream = (fileName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
  };
  return s3.getObject(params).createReadStream();
}
console.log('Downloading file...');
const s3FileStream =  getFileFromStream(fileName).pipe(fs.createWriteStream(__dirname + '/' + fileName));
// get downloaded file and pipe it to stdout
s3FileStream.on('finish', () => {
    fs.createReadStream(__dirname + '/' + fileName).pipe(output);
    });

console.log('File downloaded');
console.log('File is being piped to stdout');
readlineInterface.close();





