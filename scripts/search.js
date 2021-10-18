import * as Logging from "~/common/logging";

import * as SearchManager from "~/node_common/managers/search";

async function manage() {
  // await SearchManager.createUserIndex();
  // await SearchManager.createSlateIndex();
  // await SearchManager.createFileIndex();
  // await SearchManager.deleteUserIndex();
  // await SearchManager.deleteSlateIndex();
  // await SearchManager.deleteFileIndex();
}

async function update() {
  // await SearchManager.indexUser({
  //   id: "5172dd8b-6b11-40d3-8c9f-b4cbaa0eb8e7",
  //   username: "martina",
  //   name: "Martina Long",
  //   body:
  //     "My name is Martina. Working at @slate aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  //   photo:
  //     "https://slate.textile.io/ipfs/bafybeid7ykqgrsgmqsknpmxs25k6zbt4n5yoq72auboyyhgbmaf647wbku",
  //   followerCount: 2,
  //   slateCount: 41,
  // });
  //
  // await SearchManager.indexSlate({
  //   id: "0824a3cb-e839-4246-8ff4-d919919e1487",
  //   slatename: "bird-drinks",
  //   ownerId: "5172dd8b-6b11-40d3-8c9f-b4cbaa0eb8e7",
  //   isPublic: true,
  //   subscriberCount: 1,
  //   fileCount: 14,
  //   body: "drinks in cool bird cups",
  //   name: "bird drinks",
  //   preview: null,
  // });
  //
  // await SearchManager.indexFile({
  //   id: "10071abd-95c5-415e-8a12-aa17e7f560cf",
  //   ownerId: "f9cc7b00-ce59-4b49-abd1-c7ef7253e258",
  //   cid: "bafybeihr3eepugleul7tyw7niwpralwrnfhpxlnafies7cuufhssnkvsqe",
  //   isPublic: true,
  //   filename: "foggy.jpeg",
  //   downloadCount: 0,
  //   saveCount: 0,
  //   url: null,
  //   isLink: false,
  //   name: "foggy.jpeg",
  //   size: 485757,
  //   type: "image/jpeg",
  //   blurhash: "UJD,Gx~WIpWVIpR.R+RjSjNHITWBR,oes:s:",
  //   tags: [
  //     { id: "d82fbc78-88de-4015-adec-a7ea832fc922", name: "martuna", slatename: "martuna" },
  //     { id: "0824a3cb-e839-4246-8ff4-d919919e1487", name: "bird drinks", slatename: "bird-drinks" },
  //   ],
  // });
  //   await SearchManager.updateFile({
  //     id: "10071abd-95c5-415e-8a12-aa17e7f560cf",
  //     filename: "sunny.jpeg",
  //     name: "sunny.jpeg",
  //   });
  //   await SearchManager.deleteFile({
  //     id: "10071abd-95c5-415e-8a12-aa17e7f560cf",
  //   });
}

async function search() {
  // await SearchManager.searchUser({ query: "martina" });
  //   await SearchManager.searchSlate({
  //     query: "bird",
  //     userId: "5172dd8b-6b11-40d3-8c9f-b4cbaa0eb8e7",
  //     globalSearch: false,
  //   });
  await SearchManager.searchFile({
    query: "sunny.jpeg",
    userId: "f9cc7b00-ce59-4b49-abd1-c7ef7253e258",
    globalSearch: true,
    tagIds: ["d82fbc78-88de-4015-adec-a7ea832fc922", "0824a3cb-e839-4246-8ff4-d919919e1487"],
  });
}

Promise.all([manage(), update(), search()]);

Logging.log(`FINISHED: search.js`);
Logging.log(`          CTRL + C to return to terminal.`);
