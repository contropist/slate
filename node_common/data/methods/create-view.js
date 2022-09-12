import { runQuery } from "~/node_common/data/utilities";

export default async ({ ownerId, name, filterBySource, filterBySlateId, metadata = {} }) => {
  return await runQuery({
    label: "CREATE_VIEW",
    queryFn: async (DB) => {
      let query = await DB.insert({
        ownerId,
        name,
        filterBySource,
        filterBySlateId,
        metadata: JSON.stringify(metadata),
      })
        .into("views")
        .returning("*");

      if (!query) {
        return null;
      }

      query = query.pop();

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async () => {
      return {
        error: true,
        decorator: "CREATE_VIEW",
      };
    },
  });
};
