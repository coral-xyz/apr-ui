import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

/**
 * Find up-to-date verification status
 * @param {String} programId
 * @return {Promise<boolean>}
 */
export default async function verificationStatus(
  programId: string
): Promise<boolean> {
  const pubkey = new PublicKey(programId);
  const connection = new Connection("https://solana-api.projectserum.com");

  try {
    const result = await anchor.utils.registry.verifiedBuild(
      connection,
      pubkey,
      10
    );

    if (result === null) return false;
  } catch (e) {
    return false;
  }

  return true;
}
