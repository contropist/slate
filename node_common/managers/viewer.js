import * as Environment from "~/node_common/environment";
import * as Utilities from "~/node_common/utilities";
import * as Data from "~/node_common/data";
import * as Constants from "~/node_common/constants";
import * as Strings from "~/common/strings";
import * as Window from "~/common/window";
import * as Websocket from "~/node_common/nodejs-websocket";

import WebSocket from "ws";

const websocketSend = async (type, data) => {
  if (Strings.isEmpty(Environment.PUBSUB_SECRET)) {
    return;
  }

  let ws = Websocket.get();
  if (!ws) {
    ws = Websocket.create();
    await Window.delay(2000);
  }

  const encryptedData = await Utilities.encryptWithSecret(
    JSON.stringify(data),
    Environment.PUBSUB_SECRET
  );

  // NOTE(jim): Only allow this to be passed around encrypted.
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type,
        iv: encryptedData.iv,
        data: encryptedData.hex,
      })
    );
  }
};

export const hydratePartial = async (
  id,
  { viewer, slates, keys, library, subscriptions, following, followers }
) => {
  if (!id) return;

  let update = { id };

  if (viewer) {
    let user;
    if (library) {
      user = await Data.getUserById({
        id,
        includeFiles: true,
      });
    } else {
      user = await Data.getUserById({
        id,
      });
    }
    update = {
      ...update,
      hasCompletedSurvey: user.hasCompletedSurvey,
      hasCompletedUploadOnboarding: user.hasCompletedUploadOnboarding,
      hasCompletedSlatesOnboarding: user.hasCompletedSlatesOnboarding,
      hasCompletedExtensionOBFirstStep: user.hasCompletedExtensionOBFirstStep,
      hasCompletedExtensionOBSecondStep: user.hasCompletedExtensionOBSecondStep,
      hasCompletedExtensionOBThirdStep: user.hasCompletedExtensionOBThirdStep,
      isRecentViewActivated: user.isRecentViewActivated,
      isFilesViewActivated: user.isFilesViewActivated,
      username: user.username,
      email: user.email,
      library: user.library,
    };
  } else if (library) {
    library = await Data.getFilesByUserId({ id, publicOnly: false });
    update.library = library;
  }

  update.libraryCids =
    update?.library?.reduce((acc, file) => ({ ...acc, [file.cid]: true }), {}) || {};

  if (slates) {
    const slates = await Data.getSlatesByUserId({
      ownerId: id,
      sanitize: true,
      includeFiles: true,
    });
    update.slates = slates;
  }

  if (keys) {
    const keys = await Data.getAPIKeysByUserId({ userId: id });
    update.keys = keys;
  }

  if (subscriptions) {
    const subscriptions = await Data.getSubscriptionsByUserId({ ownerId: id });
    update.subscriptions = subscriptions;
  }

  if (following) {
    const following = await Data.getFollowingByUserId({ ownerId: id });
    update.following = following;
  }

  if (followers) {
    const followers = await Data.getFollowersByUserId({ userId: id });
    update.followers = followers;
  }

  websocketSend("UPDATE", update);
};

export const hydrate = async (id) => {
  let data = getById({ id });
  websocketSend("UPDATE", data);
};

//NOTE(martina): determines whether user is logged in and should be redirected to in-client view
export const shouldRedirect = async ({ id }) => {
  if (Strings.isEmpty(id)) {
    return false;
  }

  const user = await Data.getUserById({
    id,
  });
  if (user && user.id) {
    return true;
  }

  return false;
};

// TODO(jim): Work on better serialization when adoption starts occuring.
export const getById = async ({ id }) => {
  let user = await Data.getUserById({
    id,
    includeFiles: true,
  });

  if (!user) {
    return null;
  }

  if (user.error) {
    return null;
  }

  delete user.password;
  delete user.salt;

  Data.createUsageStat({ id }); //NOTE(martina): to record the person's usage of Slate for analytics

  // user.library = await Data.getFilesByUserId({ id });

  const [slates, views, keys, subscriptions, following, followers] = (
    await Promise.allSettled([
      Data.getSlatesByUserId({ ownerId: id, includeFiles: true }),
      Data.getViewsByUserId({ ownerId: id }),
      Data.getAPIKeysByUserId({ userId: id }),
      Data.getSubscriptionsByUserId({ ownerId: id }),
      Data.getFollowingByUserId({ ownerId: id }),
      Data.getFollowersByUserId({ userId: id }),
    ])
  ).map((item) => item.value);

  const libraryCids =
    user?.library?.reduce((acc, file) => ({ ...acc, [file.cid]: true }), {}) || {};

  let cids = {};
  let bytes = 0;
  let imageBytes = 0;
  let videoBytes = 0;
  let audioBytes = 0;
  let epubBytes = 0;
  let pdfBytes = 0;
  for (let each of user.library) {
    if (cids[each.cid]) {
      continue;
    }

    cids[each.cid] = true;
    let { size } = each;
    if (typeof size === "number") {
      bytes += size;
      let { type } = each;
      if (type) {
        if (type.startsWith("image/")) {
          imageBytes += size;
        } else if (type.startsWith("video/")) {
          videoBytes += size;
        } else if (type.startsWith("audio/")) {
          audioBytes += size;
        } else if (type.startsWith("application/epub")) {
          epubBytes += size;
        } else if (type.startsWith("application/pdf")) {
          pdfBytes += size;
        }
      }
    }

    let { coverImage } = each;
    if (coverImage && !cids[coverImage.cid]) {
      cids[coverImage.cid] = true;
      size = coverImage.size;
      if (typeof size === "number") {
        imageBytes += size;
      }
    }
  }

  // const tags = Utilities.getUserTags({ library: user.library });

  let viewer = {
    ...user,
    stats: {
      bytes,
      maximumBytes: Constants.TEXTILE_ACCOUNT_BYTE_LIMIT,
      imageBytes,
      videoBytes,
      audioBytes,
      epubBytes,
      pdfBytes,
    },
    // tags,
    keys,
    slates,
    views,
    subscriptions,
    following,
    followers,
    libraryCids,
  };

  return viewer;
};
