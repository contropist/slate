import * as Data from "~/node_common/data";
import * as Strings from "~/common/strings";
import * as ViewerManager from "~/node_common/managers/viewer";
import * as RequestUtilities from "~/node_common/request-utilities";
import * as Environment from "~/node_common/environment";

export default async (req, res) => {
  if (!Strings.isEmpty(Environment.ALLOWED_HOST) && req.headers.host !== Environment.ALLOWED_HOST) {
    return res.status(403).send({ decorator: "SERVER_CREATE_VIEW_NOT_ALLOWED", error: true });
  }

  const userInfo = await RequestUtilities.checkAuthorizationInternal(req, res);
  if (!userInfo) {
    return res.status(403).send({ decorator: "SERVER_CREATE_VIEW_NOT_ALLOWED", error: true });
  }

  const name = req?.body?.data?.name;
  const filterBySource = req?.body?.data?.filterBySource;
  const filterBySlateId = req?.body?.data?.filterBySlateId;
  const metadata = req?.body?.data?.metadata;

  if (!name || (!filterBySource && !filterBySlateId)) {
    return res.status(403).send({ decorator: "SERVER_CREATE_VIEW_INVALID_DATA", error: true });
  }

  const { id } = userInfo;

  if (filterBySource) {
    try {
      new URL(filterBySource);
    } catch (e) {
      return res.status(403).send({ decorator: "SERVER_CREATE_VIEW_INVALID_DATA", error: true });
    }

    const existingView = await Data.getViewByUserIdAndSource({ ownerId: id, filterBySource });
    if (existingView) {
      return res.status(403).send({ decorator: "SERVER_CREATE_VIEW_INVALID_DATA", error: true });
    }
  }

  if (filterBySlateId) {
    const slate = await Data.getSlateById({ id: filterBySlateId });
    if (!slate) {
      return res.status(403).send({ decorator: "SERVER_CREATE_VIEW_INVALID_DATA", error: true });
    }
  }

  const response = await Data.createView({
    ownerId: id,
    name,
    filterBySlateId,
    filterBySource,
    metadata,
  });

  if (!response) {
    return res.status(404).send({ decorator: "SERVER_CREATE_VIEW_FAILED", error: true });
  }

  if (response.error) {
    return res.status(500).send({ decorator: "SERVER_CREATE_VIEW_FAILED", error: true });
  }

  await ViewerManager.hydratePartial(id, { viewer: true });

  return res.status(200).send({ decorator: "SERVER_CREATE_VIEW_SUCCESS" });
};
