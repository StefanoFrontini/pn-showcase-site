/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { ThemeProvider } from "@mui/system";
import type { AppProps } from "next/app";

import { theme } from "@pagopa/mui-italia";

import { ConfigProvider } from "src/context/config-context";
import Loading from "../components/loading";
import { LangProvider } from "../context/lang-context";
import "../styles/default.css";

function MyApp({ Component, pageProps }: AppProps) {
  const translationLoading =
    !pageProps.lang || !pageProps.translations || !pageProps.vegaLocale;

  return (
    <ConfigProvider>
      <ThemeProvider theme={theme}>
        <LangProvider
          lang={pageProps.lang}
          translations={pageProps.translations}
          vegaLocale={pageProps.vegaLocale}
        >
          {translationLoading && <Loading />}

          <Component {...pageProps} />
        </LangProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default MyApp;
