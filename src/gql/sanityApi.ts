import { GraphQLClient } from "graphql-request";
import { getSdk } from "./graphqlRequest";

const endpoint = `https://api.communityos.io/graphql`;

export const API = getSdk(
  new GraphQLClient(endpoint, {
    fetch,
  }),
);
