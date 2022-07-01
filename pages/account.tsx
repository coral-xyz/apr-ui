import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Alert, AlertTitle, Box, Grid, TextField } from "@mui/material";
import fetch from "isomorphic-unfetch";
import useAuth from "../hooks/useAuth";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import dynamic from "next/dynamic";

const Tokens = dynamic(() => import("../components/account/tokens"));
const Success = dynamic(() => import("../components/notifications/success"));

const metaTags = {
  title: "apr",
  description: "Anchor Programs Registry",
  shouldIndex: false,
  url: "https://apr.dev",
};

export default function Account() {
  const { session, status } = useAuth(true);
  const { data: user } = useSWR("/api/user", fetcher);
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (username === "" && user) setUsername(user.username);
  }, [username, user]);

  if (!session) return null;

  const handleUpdateUsername = async () => {
    await fetch(`/api/user`, {
      method: "PUT",
      body: JSON.stringify({ username }),
    });
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  return (
    <Layout metaTags={metaTags}>
      <Grid container gap={10}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Username"
              id="fullWidth"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="text-md rounded-md bg-orange-400/90 px-5 py-3 font-medium uppercase tracking-wide text-gray-700
               disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              disabled={username === user?.username}
              onClick={handleUpdateUsername}
            >
              Update Username
            </button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Alert variant="filled" severity="error">
            <AlertTitle>https://anchor.projectserum.com</AlertTitle>
            If you have a user already in the old version, please continue managing your keys in
            that UI
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Tokens />
        </Grid>
        <Success
          show={show}
          setShow={setShow}
          message="Username updated!"
          subText="Your username has been successfully updated."
        />
      </Grid>
    </Layout>
  );
}
