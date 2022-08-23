import { NextApiRequest, NextApiResponse } from "next";
import { Connection, PublicKey } from "@solana/web3.js";
import { Address, AnchorProvider, Program } from "@project-serum/anchor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const address = req.query.address as Address;

      const connection = new Connection(
        process.env.NEXT_PUBLIC_NODE_URL as string
      );

      const provider = new AnchorProvider(
        connection,
        {
          publicKey: PublicKey.default,
          signAllTransactions: undefined,
          signTransaction: undefined,
        },
        { commitment: "processed", skipPreflight: true }
      );

      const idl = await Program.fetchIdl(address, provider);

      res.status(200).json({
        name: idl.name,
        address: address,
        id: 1,
        idl,
      });
    } catch (e) {
      console.error("Error:", e);
      res.status(500).json({ error: e.message });
    }
  }
}
