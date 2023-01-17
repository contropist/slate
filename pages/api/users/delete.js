import * as Data from "~/node_common/data";
import SearchManager from "~/node_common/managers/search";
import * as RequestUtilities from "~/node_common/request-utilities";

export default async (req, res) => {
  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) return;
  const { id, user } = userInfo;

  // NOTE(jim): remove their public slates and files from the search cache.
  let slates = await Data.getSlatesByUserId({ ownerId: id, publicOnly: true });
  SearchManager.deleteSlate(slates);

  let files = await Data.getFilesByUserId({ id, publicOnly: true });
  SearchManager.deleteFile(files);

  //NOTE(migration): may be able to just condense these two parts since they return it from delete anyways
  // NOTE(jim): delete all of their public and private slates.
  slates = await Data.deleteSlatesByUserId({ ownerId: id });

  // NOTE(martina): delete all of their public and private files.
  files = await Data.deleteFilesByUserId({ ownerId: id });

  SearchManager.deleteUser(user);

  // NOTE(jim): remove orphan
  await Data.createOrphan({
    data: { token: user.textileKey },
  });

  // NOTE(jim): finally delete user by id (irreversible)
  const deleted = await Data.deleteUserById({ id: user.id });

  if (!deleted || deleted.error) {
    return res.status(500).send({ decorator: "SERVER_USER_DELETE", error: true });
  }

  return res.status(200).send({ decorator: "SERVER_USER_DELETE", deleted });
};
