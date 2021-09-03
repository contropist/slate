import configs from "~/knexfile";
import knex from "knex";
import { v4 as uuid } from "uuid";

import * as Logging from "~/common/logging";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

const envConfig = configs["development"];

const DB = knex(envConfig);

Logging.log(`RUNNING:  files-migration.js`);

/* Check which properties exist */

const printUsersTable = async () => {
  const users = await DB.select("*").from("users");
  let dataParams = {};
  let twitterParams = {};
  let statusParams = {};
  let onboardingParams = {};
  let settingsParams = {};
  let tokensParams = {};
  for (let user of users) {
    for (let param of Object.keys(user.data)) {
      if (!dataParams[param]) {
        dataParams[param] = true;
      }
    }
    if (user.data.twitter) {
      for (let param of Object.keys(user.data.twitter)) {
        if (!twitterParams[param]) {
          twitterParams[param] = true;
        }
      }
    }
    if (user.data.status) {
      for (let param of Object.keys(user.data.status)) {
        if (!statusParams[param]) {
          statusParams[param] = true;
        }
      }
    }
    if (user.data.onboarding) {
      for (let param of Object.keys(user.data.onboarding)) {
        if (!onboardingParams[param]) {
          onboardingParams[param] = true;
        }
      }
    }
    if (user.data.settings) {
      for (let param of Object.keys(user.data.settings)) {
        if (!settingsParams[param]) {
          settingsParams[param] = true;
        }
      }
    }
    if (user.data.tokens) {
      for (let param of Object.keys(user.data.tokens)) {
        if (!tokensParams[param]) {
          tokensParams[param] = true;
        }
      }
    }
  }
  Logging.log({ dataParams: Object.keys(dataParams) });
  Logging.log({ twitterParams: Object.keys(twitterParams) });
  Logging.log({ statusParams: Object.keys(statusParams) });
  Logging.log({ onboardingParams: Object.keys(onboardingParams) });
  Logging.log({ settingsParams: Object.keys(settingsParams) });
  Logging.log({ tokensParams: Object.keys(tokensParams) });
};

const printSlatesTable = async () => {
  const slates = await DB.select("*").from("slates");
  let dataParams = {};
  for (let slate of slates) {
    for (let param of Object.keys(slate.data)) {
      if (!dataParams[param]) {
        dataParams[param] = true;
      }
    }
  }
  Logging.log({ dataParams: Object.keys(dataParams) });
};

const printFilesTable = async () => {
  const files = await DB.select("*").from("files");
  let dataParams = {};
  let linkParams = {};
  for (let file of files) {
    for (let param of Object.keys(file.data)) {
      if (!dataParams[param]) {
        dataParams[param] = true;
      }
    }
    if (file.data.link) {
      for (let param of Object.keys(file.data.link)) {
        if (!linkParams[param]) {
          linkParams[param] = true;
        }
      }
    }
  }
  Logging.log({ dataParams: Object.keys(dataParams) });
  Logging.log({ linkParams: Object.keys(linkParams) });
};

/* Add columns (including tags) */

const addUserColumns = async () => {
  await DB.schema.table("users", function (table) {
    table.string("body").nullable();
    table.string("photo").nullable();
    table.string("name").nullable();
    table.string("twitterUsername").nullable();
    table.boolean("twitterVerified").notNullable().defaultTo(false);
    table.boolean("hidePrivacyAlert").notNullable().defaultTo(false);
    table.string("textileToken").nullable();
    table.boolean("settingsDealsAutoApprove").notNullable().defaultTo(false);
    table.boolean("allowAutomaticDataStorage").notNullable().defaultTo(true);
    table.boolean("allowEncryptedDataStorage").notNullable().defaultTo(true);
    table.jsonb("onboarding").nullable();
  });
};

const addSlateColumns = async () => {
  await DB.schema.table("slates", function (table) {
    table.string("body").nullable();
    table.string("name").nullable();
    table.string("preview").nullable();
  });
};

const addFileColumns = async () => {
  await DB.schema.table("files", function (table) {
    table.renameColumn("data", "oldData");
  });
  await DB.schema.table("files", function (table) {
    table.string("name").nullable();
    table.integer("size").notNullable().defaultTo(0);
    table.string("type").notNullable().defaultTo("link");
    table.string("blurhash").nullable();
    table.string("source").nullable();
    table.string("body").nullable();
    table.string("author").nullable();
    table.jsonb("coverImage").nullable();
    table.jsonb("data").nullable(); //where you'll move unity stuff
    table.string("linkName").nullable();
    table.string("linkBody").nullable();
    table.string("linkAuthor").nullable();
    table.string("linkSource").nullable();
    table.string("linkDomain").nullable();
    table.string("linkImage").nullable();
    table.string("linkFavicon").nullable();
    table.string("linkHtml").nullable();
    table.boolean("linkIFrameAllowed").nullable().defaultTo(false);
    table.jsonb("tags").nullable();
  });
};

/* Migrate over to new columns (and denormalize tags) */

const migrateUserTable = async () => {
  const users = await DB.select("id", "data").from("users");
  for (let user of users) {
    let data = user.data;
    let newUser = {
      name: data.name,
      body: data.body,
      photo: data.photo,
      hidePrivacyAlert: data.status?.hidePrivacyAlert,
      textileToken: data.tokens?.api,
      settingsDealsAutoApprove: data.settings?.settings_deals_auto_approve,
      allowAutomaticDataStorage: data.settings?.allow_automatic_data_storage,
      allowEncryptedDataStorage: data.settings?.allow_encrypted_data_storage,
      onboarding: data.onboarding,
      twitterUsername: data.twitter?.username,
      twitterVerified: data.twitter?.verified,
    };
    const response = await DB.from("users").where("id", user.id).update(newUser);
  }
};

const migrateSlateTable = async () => {
  const slates = await DB.select("id", "data").from("slates");
  for (let slate of slates) {
    let data = slate.data;
    let newSlate = {
      name: data.name,
      body: data.body,
      preview: data.preview,
    };
    const response = await DB.from("slates").where("id", slate.id).update(newSlate);
  }
};

const migrateFileTable = async () => {
  const files = await DB.select("id", "oldData").from("files");
  for (let file of files) {
    let data = file.oldData;
    if (!data) {
      console.log(`no data for file with id ${file.id}`);
      continue;
    }

    let newFile = {
      name: data.name,
      body: data.body,
      size: data.size,
      type: data.type,
      blurhash: data.blurhash,
      source: data.source,
      author: data.author,
      data: data.unity ? { unity: data.unity } : null,
      linkName: data.link?.name,
      linkBody: data.link?.body,
      linkAuthor: data.link?.author,
      linkSource: data.link?.source,
      linkDomain: data.link?.domain,
      linkImage: data.link?.image,
      linkFavicon: data.link?.logo,
      linkHtml: data.link?.html,
      linkIFrameAllowed: data.link?.iFrameAllowed,
    };

    let coverImage = data.coverImage;
    if (coverImage) {
      console.log({ coverImage });
      let newCoverImage = {
        ...coverImage,
        size: coverImage.data.size,
        type: coverImage.data.type,
        blurhash: coverImage.data.blurhash,
        data: null,
      };
      console.log({ newCoverImage });
    }

    let tags = await DB.select("slates.id", "slates.slatename")
      .from("slates")
      .join("slate_files", "slate_files.slateId", "=", "slates.id")
      .where("slate_files.fileId", file.id);
    if (tags?.length) {
      newFile.tags = tags;
    }
    const response = await DB.from("files").where("id", file.id).update(newFile);
  }
};

/* Delete the old (and convert newData to data) */

const deleteUserData = async () => {
  await DB.schema.table("users", function (table) {
    table.dropColumn("data");
  });
  await DB.schema.table("slates", function (table) {
    table.dropColumn("data");
  });
  await DB.schema.table("files", function (table) {
    table.dropColumn("oldData");
  });
};

const runScript = async () => {
  await printUsersTable();
  await printSlatesTable();
  await printFilesTable();

  //   await addUserColumns();
  //   await addSlateColumns();
  //   await addFileColumns();

  //   await migrateUserTable();
  //   await migrateSlateTable();
  //   await migrateFileTable();
  console.log("SCRIPT FINISHED");
};

runScript();

/*
Users
[
    'data.name', -> 'name' MIGRATED
    'data.body', -> 'body' MIGRATED
    'data.photo', -> 'photo' MIGRATED
    'data.status', -> 'hidePrivacyAlert' MIGRATED
    'data.tokens.api', -> 'textileToken' MIGRATED
    'data.settings.settings_deals_auto_approve', -> 'settingsDealsAutoApprove' MIGRATED
    'data.settings.allow_automatic_data_storage', -> 'allowAutomaticDataStorage' MIGRATED
    'data.settings.allow_encrypted_data_storage', -> 'allowEncryptedDataStorage' MIGRATED
    'data.onboarding', -> 'onboarding' MIGRATED
    'data.twitter.username', -> 'twitterUsername' MIGRATED
    'data.twitter.verified', -> 'twitterVerified' MIGRATED
]

Slates
[ 
    'data.name', -> 'name' MIGRATED
    'data.body', -> 'body' MIGRATED
    'data.preview', -> 'preview' MIGRATED
]

Files
[
    'data.name', -> 'name' MIGRATED
    'data.size', -> 'size' MIGRATED
    'data.type', -> 'type' MIGRATED
    'data.blurhash', -> 'blurhash' MIGRATED
    'data.source', -> 'source' MIGRATED
    'data.body', -> 'body' MIGRATED
    'data.author', -> 'author' MIGRATED
    'data.coverImage', -> 'coverImage' MIGRATED
    'data.unity', -> 'data.unity' MIGRATED
    'data.link.name', -> 'linkName' MIGRATED
    'data.link.body', -> 'linkBody' MIGRATED
    'data.link.author', -> 'linkAuthor' MIGRATED
    'data.link.source', -> 'linkSource' MIGRATED
    'data.link.domain', -> 'linkDomain' MIGRATED
    'data.link.image', -> 'linkImage' MIGRATED
    'data.link.logo', -> 'linkFavicon' MIGRATED
    'data.link.html', -> 'linkHtml' MIGRATED
    'data.link.iFrameAllowed', -> 'linkIFrameAllowed' MIGRATED
    ADD 'tags'
]
*/
