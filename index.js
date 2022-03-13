import * as readline from 'node:readline/promises';

import AWS from 'aws-sdk';
import fs from 'node:fs';
import path from 'node:path';

import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3 = new AWS.S3();

// get the bucket name from the command line
const readlineInterface = readline.createInterface({ input, output });
const getUrlFromUser = await readlineInterface.question('Enter the s3 url: ');

// is the url valid?
const s3Regex = /^s3:\/\/([^\/]+)\/(.+)$/;
const url = await getUrlFromUser.match(s3Regex);
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
const s3FileStream =  getFileFromStream(fileName).pipe(fs.createWriteStream(__dirname + '/' + fileName));
// get downloaded file and pipe it to stdout
s3FileStream.on('finish', () => {
    fs.createReadStream(__dirname + '/' + fileName).pipe(output);
    });

readlineInterface.close();





