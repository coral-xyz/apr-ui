import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import fetch from "isomorphic-unfetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/apikey`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } else if (req.method === "POST") {
    try {
      const { name } = JSON.parse(req.body);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/apikey`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({
            name: name,
          }),
        }
      );

      res.status(200).send(await response.json());
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = JSON.parse(req.body);

      await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/apikey/revoke`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          body: JSON.stringify({
            id,
          }),
        }
      );

      res.status(204).send("");
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
