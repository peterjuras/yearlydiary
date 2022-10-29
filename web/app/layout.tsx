"use-client";

import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <title>Yearlydiary</title>
      </head>
      <body>
        <ChakraProvider resetCSS>{children}</ChakraProvider>
      </body>
    </html>
  );
}

export default MyApp;
