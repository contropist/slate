import "isomorphic-fetch";

import * as Environment from "~/node_common/environment";
import * as Logging from "~/common/logging";

import configs from "~/knexfile";
import knex from "knex";
import fs from "fs";

const ERROR_FILE = "messages.txt";

const envConfig = configs["development"];

const DB = knex(envConfig);

// TODOs (migrate all bucketCIDs to estuary) -> (automatically migrate all files)
// Retrieve all bucketCIDs
// upload them one by one to estuary
// Track errors

async function retrieveBucketsCIDs() {
  const bucketsCIDs = await DB.select("textileBucketCID")
    .from("users")
    .whereNotNull("textileBucketCID");

  return bucketsCIDs;
}

async function pinToEstuary(cid) {
  let res = await fetch("https://api.estuary.tech/content/add-ipfs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Environment.ESTUARY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cid,
    }),
  });
  let json = await res.json();
  return json;
}

async function runMigration() {
  Logging.log(`Migration started`);
  const failedBuckets = [];

  const bucketsCIDs = await retrieveBucketsCIDs();
  for (let { textileBucketCID } of bucketsCIDs) {
    try {
      const response = await pinToEstuary(textileBucketCID);

      if (response?.error) {
        Logging.error({
          error: response.error,
          decorator: "ADD_CID_TO_ESTUARY",
        });

        fs.appendFileSync(ERROR_FILE, `${textileBucketCID},${JSON.stringify(response.error)}\n`);
        failedBuckets.push(textileBucketCID);
      } else {
        Logging.log(`Bucket ${textileBucketCID} has been uploaded`, response);
      }
    } catch (e) {
      fs.appendFileSync(ERROR_FILE, `${textileBucketCID}, ${JSON.stringify(e)}\n`);
      failedBuckets.push(textileBucketCID);
      Logging.error({
        error: e,
        decorator: "ADD_CID_TO_ESTUARY",
      });
    }
  }

  fs.appendFileSync(ERROR_FILE, JSON.stringify(failedBuckets));
  console.log("SCRIPT FINISHED", failedBuckets);
}

runMigration();
