import { runQuery } from "~/node_common/data/utilities";

export default async ({ id }) => {
  return await runQuery({
    label: "DELETE_VIEW",
    queryFn: async (DB) => {
      const data = await DB.from("views").where({ id }).del().returning("*");

      return data;
    },
    errorFn: async (e) => {
      return {
        error: true,
        decorator: "DELETE_VIEW",
      };
    },
  });
};
