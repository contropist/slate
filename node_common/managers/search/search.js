import {
  searchClient,
  usersIndex,
  slatesIndex,
  filesIndex,
} from "~/node_common/managers/search/search-client";

export const searchAll = async ({ query }) => {
  await searchClient.msearch({
    index: [usersIndex, slatesIndex, filesIndex],
    body: {},
  });
};

export const searchUser = async ({ query }) => {
  try {
    const must = [
      {
        multi_match: {
          query,
          fuzziness: "AUTO",
          type: "best_fields",
          fields: ["username^2", "name^2", "body"],
          tie_breaker: 0.3,
        },
      },
    ];

    const result = await searchClient.search({
      index: usersIndex,
      body: {
        query: {
          bool: {
            must,
          },
        },
      },
    });

    if (result.statusCode === 200) {
      const hits = result?.body?.hits?.hits;

      let users = hits.map((hit) => hit._source);
      console.log(users);
      return users;
    }
  } catch (e) {
    console.log(e);
  }
};

export const searchSlate = async ({ query, userId, globalSearch = false }) => {
  try {
    const must = [
      {
        multi_match: {
          query,
          fuzziness: "AUTO",
          type: "best_fields",
          fields: ["slatename^2", "name", "body"],
          tie_breaker: 0.3,
        },
      },
    ];

    let ownerQuery = {
      bool: {
        should: [{ term: { ownerId: userId } }],
      },
    };
    if (globalSearch) {
      ownerQuery.bool.should.push({ term: { isPublic: true } });
    }
    must.push(ownerQuery);

    const result = await searchClient.search({
      index: slatesIndex,
      body: {
        query: {
          bool: {
            must,
          },
        },
      },
    });

    if (result.statusCode === 200) {
      const hits = result?.body?.hits?.hits;

      let slates = hits.map((hit) => hit._source);
      console.log(slates);
      return slates;
    }
  } catch (e) {
    console.log(e);
  }
};

export const searchFile = async ({ query, userId, globalSearch = false, tagIds = [] }) => {
  try {
    const must = [
      {
        multi_match: {
          //or maybe do combined_fields
          query,
          fuzziness: "AUTO",
          type: "best_fields",
          fields: [
            "name^2",
            "body",
            "author",
            "source",
            "linkName^2",
            "linkBody",
            "linkAuthor",
            "linkSource",
            "linkDomain",
          ],
          tie_breaker: 0.3,
        },
      },
    ];

    if (tagIds.length) {
      let should = tagIds.map((tagId) => {
        return { term: { "tags.id": tagId } };
      });
      let tagQuery = {
        bool: {
          should,
        },
      };
      must.push(tagQuery);
    }

    let ownerQuery = {
      bool: {
        should: [{ term: { ownerId: userId } }],
      },
    };
    if (globalSearch) {
      ownerQuery.bool.should.push({ term: { isPublic: true } });
    }
    must.push(ownerQuery);

    const result = await searchClient.search({
      index: filesIndex,
      body: {
        query: {
          bool: {
            must,
            // filter: [{ term: { "tags.id": "0824a3cb-e839-4246-8ff4-d919919e1487" } }],
            // filter: [{ term: { isLink: true } }],
            // filter: [{ term: { ownerId: "f9cc7b00-ce59-4b49-abd1-c7ef7253e258" } }],
            // filter: [
            //   { term: { ownerId: "f9cc7b00-ce59-4b49-abd1-c7ef7253e258" } },
            //   { term: { isLink: true } },
            // ],
          },
        },
      },
    });
    // const result = await searchClient.search({
    //   index: "files",
    //   body: {
    //     query: {
    //       bool: {
    //         must: {
    //           multi_match: {
    //             query,
    //             fuzziness: "AUTO",
    //             type: "best_fields",
    //             fields: [
    //               "name",
    //               "body",
    //               "author",
    //               "source",
    //               "linkName",
    //               "linkBody",
    //               "linkAuthor",
    //               "linkSource",
    //               "linkDomain",
    //             ],
    //             tie_breaker: 0.3,
    //           },
    //         },
    //         should: [
    //           { term: { ownerId: "f9cc7b00-ce59-4b49-abd1-c7ef7253e258" } },
    //           { term: { isLink: false } },
    //         ],
    //         minimum_should_match: 1,
    //         // filter: [{ term: { "tags.id": "0824a3cb-e839-4246-8ff4-d919919e1487" } }],
    //         // filter: [{ term: { isLink: true } }],
    //         // filter: [{ term: { ownerId: "f9cc7b00-ce59-4b49-abd1-c7ef7253e258" } }],
    //         // filter: [
    //         //   { term: { ownerId: "f9cc7b00-ce59-4b49-abd1-c7ef7253e258" } },
    //         //   { term: { isLink: true } },
    //         // ], //this does an AND, not an OR
    //       },
    //     },
    //   },
    // });

    if (result.statusCode === 200) {
      const hits = result?.body?.hits?.hits;

      let files = hits.map((hit) => hit._source);
      console.log(files);
      return files;
    }
  } catch (e) {
    console.log(e);
  }
};
