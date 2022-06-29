import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { ContextProvider } from "../context/ContextProvider";
import Nav from "../components/nav";
import "../style.css";

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
    <PlausibleProvider domain="apr.dev" trackOutboundLinks={true}>
      <SessionProvider session={session}>
        <ContextProvider>
          <div className="">
            <Nav />
            <CacheProvider value={emotionCache}>
              <ThemeProvider theme={theme}>
                <div className="mx-auto max-w-7xl px-10 pt-8 pb-20">
                  <Component {...pageProps} />
                </div>
              </ThemeProvider>
            </CacheProvider>
          </div>
        </ContextProvider>
      </SessionProvider>
    </PlausibleProvider>
  );
}
