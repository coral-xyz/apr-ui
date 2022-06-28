import { useEffect, useState } from "react";
import Layout from "../components/layout";
import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
} from "@mui/material";
import fetch from "isomorphic-unfetch";
import useAuth from "../hooks/useAuth";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import Tokens from "../components/account/tokens";
import { TransitionProps } from "@mui/material/transitions";

const metaTags = {
  title: "apr",
  description: "Anchor Programs Registry",
  shouldIndex: false,
  url: "https://apr.dev",
};
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
export default function Account() {
  const { session, status } = useAuth(true);
  const { data: user } = useSWR("/api/user", fetcher);
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });
  // useEffect(() => {
  //   if (username === "" && user) setUsername(user.username);
  // }, [username, user]);

  if (!session) return null;
  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >
    ) =>
    () => {
      setOpen({
        open: true,
        Transition,
      });
    };

  const handleClose = () => {
    setOpen({
      ...open,
      open: false,
    });
  };
  const handleUpdateUsername = async () => {
    await fetch(`/api/user`, {
      method: "PUT",
      body: JSON.stringify({ username }),
    });
    handleClick(SlideTransition)();
  };

  return (
    <Layout metaTags={metaTags}>
      <Snackbar
        open={open.open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={open.Transition}
        key={open.Transition.name}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          User name updated!
        </Alert>
      </Snackbar>
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
