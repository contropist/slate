import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as RequestUtilities from "~/node_common/request-utilities";
import * as Environment from "~/node_common/environment";

export default async (req, res) => {
  if (!Strings.isEmpty(Environment.ALLOWED_HOST) && req.headers.host !== Environment.ALLOWED_HOST) {
    return res.status(403).send({ decorator: "SERVER_DELETE_VIEW_NOT_ALLOWED", error: true });
  }

  const viewId = req?.body?.data?.id;

  if (!viewId) {
    return res.status(403).send({ decorator: "SERVER_DELETE_VIEW_INVALID_DATA", error: true });
  }

  const view = await Data.getViewById({ id: viewId });

  if (!view) {
    return res.status(403).send({ decorator: "SERVER_DELETE_VIEW_INVALID_DATA", error: true });
  }

  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) return;

  const { id } = userInfo;

  const response = await Data.deleViewById({
    id: viewId,
  });

  if (!response) {
    return res.status(404).send({ decorator: "SERVER_DELETE_VIEW_FAILED", error: true });
  }

  if (response.error) {
    return res.status(500).send({ decorator: "SERVER_DELETE_VIEW_FAILED", error: true });
  }

  await ViewerManager.hydratePartial(id, { viewer: true });

  return res.status(200).send({ decorator: "SERVER_DELETE_VIEW_SUCCESS" });
};
