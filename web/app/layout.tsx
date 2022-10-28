import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <head>
        <title>Yearlydiary</title>
      </head>
      <body>
        <ChakraProvider resetCSS>
          <Component {...pageProps} />
        </ChakraProvider>
      </body>
    </html>
  );
}

export default MyApp;
