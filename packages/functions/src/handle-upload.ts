import { S3Handler } from "aws-lambda";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import readline from "readline";

const S3 = new S3Client({});

// Read stream for downloading from S3
async function readStreamFromS3({
  Bucket,
  Key,
}: {
  Bucket: string;
  Key: string;
}) {
  const commandPullObject = new GetObjectCommand({
    Bucket,
    Key,
  });
  const response = await S3.send(commandPullObject);

  return response;
}

const readStreamData = async (stream: Readable) => {
  return new Promise((resolve, reject) => {
    let hand = "";
    let handsArray: string[] = [];

    stream.on("line", (line) => {
      if (line.startsWith("Hand #")) {
        handsArray.push(hand);
        hand = "";
        hand += line + "\n";
      } else {
        hand += line + "\n";
      }
    });

    stream.on("end", () => {
      resolve(handsArray);
    });

    stream.on("close", () => {
      console.log("Finished reading stream");
      // Perform any final actions here
      console.log("here?", handsArray.length);
    });
  });
};

export const handler: S3Handler = async (event) => {
  const s3Record = event.Records[0].s3;

  let handsArray = [];
  try {
    const params = {
      Bucket: s3Record.bucket.name,
      Key: s3Record.object.key,
    };

    const stream = await readStreamFromS3(params);

    const rl = readline.createInterface({
      input: stream.Body as Readable,
    });

    let handsArray = await readStreamData(stream.Body as Readable);
    console.log("handsArray: ", handsArray);

    // For text files
  } catch (error) {}
  console.log("Finished reading stream", handsArray.length);
};
