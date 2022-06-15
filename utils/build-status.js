export default function buildStatus(build) {
  if (build.verified === "Verified") {
    return "verified";
  } else if (build.aborted) {
    return "aborted";
  } else if (build.state === "Ready" && build.verified === "None") {
    return "building";
  } else {
    return "failed";
  }
}
