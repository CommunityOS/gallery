import type { IGraphQLConfig } from "graphql-config";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

export const jsChileURL = `https://api.communityos.io/graphql`;
export const apiDocuments = ["app/**/*.gql", "src/**/*.gql"];
const config: IGraphQLConfig = {
  schema: [jsChileURL],
  documents: [...apiDocuments],
};

export default config;
