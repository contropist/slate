import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "GET_VIEW_BY_ID",
    queryFn: async (DB) => {
      const query = await DB.select("*").from("views").where({ id }).first();

      if (!query || query.error) {
        return null;
      }

      return JSON.parse(JSON.stringify(query));
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "GET_VIEW_BY_ID",
      };
    },
  });
};
