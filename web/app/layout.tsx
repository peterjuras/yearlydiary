import ChakraProviderClient from "./client-wrappers/ChakraProviderClient";

function MyApp({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>
        <ChakraProviderClient>{children}</ChakraProviderClient>
      </body>
    </html>
  );
}

export default MyApp;
