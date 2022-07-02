import fetch from "isomorphic-unfetch";

export default async function FetcherMulti(...args) {
  const res = await fetch(...args);
  const text = await res.text();

  console.log(json);
  return { text, json };
}
