import "../style.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { ContextProvider } from "../context/ContextProvider";
import Nav from "../components/nav";
import { Box, Container } from "@mui/material";

require("@solana/wallet-adapter-react-ui/styles.css");

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <PlausibleProvider domain="apr.dev" trackOutboundLinks={true}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />

          <SessionProvider session={session}>
            <ContextProvider>
              <Box sx={{ overflow: "hidden" }}>
                <Nav />

                <Container sx={{ paddingY: 10 }}>
                  <Component {...pageProps} />
                </Container>
              </Box>
            </ContextProvider>
          </SessionProvider>
        </ThemeProvider>
      </PlausibleProvider>
    </CacheProvider>
  );
}
