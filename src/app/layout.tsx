import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s - Italog",
    default: "Italog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/icon-512.png" type="image/png" />
      </head>
      <body className={`antialiased`}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
