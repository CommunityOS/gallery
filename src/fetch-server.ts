import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql/language/printer";

const API_URL = "https://api.communityos.io/graphql";

export const fetchServer = async <T, V>(
  query: TypedDocumentNode<T, V>,
  variables: V,
  cache: RequestCache = "no-cache",
) => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 10000);

  const headers: RequestInit["headers"] = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const res = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query: print(query),
      variables: variables || undefined,
    }),
    cache,
    signal: controller.signal,
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data as T;
};

type FetchDataResult<T> = {
  data: T | null;
  error: Error | null;
};

export const fetchServerInitialData = async <T, V>(
  document: TypedDocumentNode<T, V>,
  variables: V,
): Promise<FetchDataResult<T>> => {
  let data = null;
  let error = null;

  try {
    data = await fetchServer(document, variables);
  } catch (e) {
    console.error(e);
    error = e as Error;
  }

  return { data, error };
};
