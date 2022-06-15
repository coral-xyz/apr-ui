import fetch from "isomorphic-unfetch";

export default async function FetcherMD(...args) {
  const res = await fetch(...args);
  return res.text();
}
