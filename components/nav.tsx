import * as React from "react";
import { memo, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Link from "next/link";
import SearchComponent from "./search";
import { useRouter } from "next/router";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { Logout, Person, Save } from "@mui/icons-material";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import MaterialLink from "@mui/material/Link";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function Nav() {
  const { data = [], error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v0/programs/latest`,
    fetcher
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const { wallet, publicKey, signMessage, connected } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    async function login() {
      const message = `Sign this message for authenticating with your wallet`;
      const encodedMessage = new TextEncoder().encode(message);
      try {
        const signedMessage = await signMessage(encodedMessage);

        signIn("credentials", {
          publicKey: publicKey,
          signature: bs58.encode(signedMessage),
          callbackUrl: `${window.location.origin}/`,
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (connected && status === "unauthenticated") login();
  }, [wallet, status, publicKey, connected, signMessage]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{
        boxShadow: 0,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: grey["300"],
        borderTopWidth: 4,
        borderTopStyle: "solid",
        borderTopColor: "#FC6600",
      }}
    >
      <Container>
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Link passHref href={"/"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginRight: 5,
                }}
              >
                <Image alt="" src="/logo.png" width="115px" height="37px" />
              </Box>
            </Link>
          </Box>

          {pathname !== "/" && <SearchComponent data={data} />}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <MaterialLink
              href="https://book.anchor-lang.com/"
              target="_blank"
              rel="noreferrer"
              color="secondary"
              variant="h6"
              sx={{
                textDecoration: "none !important",
              }}
            >
              Docs
            </MaterialLink>

            {status === "unauthenticated" && (
              <Button variant="contained" color="secondary" onClick={() => setVisible(true)}>
                Login with Wallet
              </Button>
            )}

            {status === "authenticated" && (
              <>
                <Tooltip title="Account">
                  <IconButton
                    onClick={handleClick}
                    size="large"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                    >
                      <Avatar sx={{ width: 30, height: 30 }} />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link href="/account" passHref>
                    <MenuItem sx={{ fontSize: 17, fontWeight: 500 }}>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                  </Link>

                  <MenuItem disabled sx={{ fontSize: 17, fontWeight: 500 }}>
                    <ListItemIcon>
                      <Save />
                    </ListItemIcon>
                    Programs
                  </MenuItem>
                  <Divider />
                  <MenuItem sx={{ fontSize: 17, fontWeight: 500 }} onClick={() => signOut()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default memo(Nav);
