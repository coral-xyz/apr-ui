import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import fetch from "isomorphic-unfetch";
import { withSentry } from "@sentry/nextjs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/user/current/wallet`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );
      const data = await response.json();

      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "PUT") {
    const { username } = JSON.parse(req.body);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify({
          id: session.user.id,
          image_id: session.user.picture || 0,
          username,
        }),
      });

      res.status(204).send("");
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default withSentry(handler);
