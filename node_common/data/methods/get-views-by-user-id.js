import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerId }) => {
  return await runQuery({
    label: "GET_VIEWS_BY_USER_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*")
        .from("views")
        .where({ ownerId })
        .orderBy("createdAt", "asc");

      if (!query || query.error) {
        return null;
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "GET_VIEWS_BY_USER_ID",
      };
    },
  });
};
