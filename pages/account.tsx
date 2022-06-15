import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Alert, AlertTitle, Box, Button, Grid, TextField } from "@mui/material";
import fetch from "isomorphic-unfetch";
import useAuth from "../hooks/useAuth";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import Tokens from "../components/account/tokens";

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

  useEffect(() => {
    if (username === "" && user) setUsername(user.username);
  }, [username, user]);

  if (!session) return null;

  const handleUpdateUsername = async () => {
    await fetch(`/api/user`, {
      method: "PUT",
      body: JSON.stringify({ username }),
    });
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
            <Button
              variant="contained"
              size="large"
              color="warning"
              disableElevation
              disabled={username === user?.username}
              onClick={handleUpdateUsername}
            >
              Update Username
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Alert variant="filled" severity="error">
            <AlertTitle>https://anchor.projectserum.com</AlertTitle>
            If you have a user already in the old version, please continue
            managing your keys in that UI
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Tokens />
        </Grid>
      </Grid>
    </Layout>
  );
}
