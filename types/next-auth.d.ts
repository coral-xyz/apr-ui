import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      id: string;
      picture: number;
    } & DefaultSession["user"];
  }
}
