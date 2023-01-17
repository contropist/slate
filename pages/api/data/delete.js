import * as Data from "~/node_common/data";
import * as ViewerManager from "~/node_common/managers/viewer";
import SearchManager from "~/node_common/managers/search";
import * as RequestUtilities from "~/node_common/request-utilities";

export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) return;
  const { id } = userInfo;

  let ids;
  if (req.body.data.ids) {
    ids = req.body.data.ids;
  } else if (req.body.data.id) {
    ids = [req.body.data.id];
  }

  if (!ids?.length) {
    return res.status(400).send({ decorator: "SERVER_REMOVE_DATA_NO_IDS", error: true });
  }

  // NOTE(martina): get the cids of the corresponding coverImages that are to be deleted
  let objects = await Data.getFilesByIds({ ids });
  objects = objects.filter((file) => file.ownerId === id);

  if (!objects.length) {
    return res.status(400).send({ decorator: "SERVER_REMOVE_DATA_NOT_ALLOWED", error: true });
  }
  ids = objects.map((file) => file.id);

  await Data.deleteFilesByIds({ ownerId: id, ids });

  SearchManager.deleteFile(objects);

  ViewerManager.hydratePartial(id, { slates: true, library: true });

  res.status(200).send({
    decorator: "SERVER_REMOVE_DATA",
    success: true,
    bucketItems: objects,
  });
};
