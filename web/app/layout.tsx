import ClientProviders from "./ClientProviders";

function MyApp({ children }: { children: any }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

export default MyApp;
