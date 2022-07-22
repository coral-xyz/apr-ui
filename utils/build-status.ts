import networkStatus from "./network-status";

/**
 * Returns the current build status.
 * @param build Program build
 * @param confirmNetwork Whether to confirm the network status
 * @returns {Promise<boolean>}
 */
export default async function buildStatus(
  build: any,
  confirmNetwork: boolean
): Promise<string> {
  if (build.verified === "Verified") {
    // Confirm the build is verified in mainnet. Only needed
    // for selected builds.
    if (confirmNetwork) {
      const networkVerified = await networkStatus(build.address);

      if (networkVerified) {
        return "verified";
      }

      return "failed";
    }

    return "verified";
  } else if (build.aborted) {
    return "aborted";
  } else if (build.state === "Ready" && build.verified === "None") {
    return "building";
  } else if (build.state === "Built" && build.verified === "None") {
    return "built";
  } else {
    return "failed";
  }
}
