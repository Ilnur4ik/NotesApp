import type { Metadata } from "next";
import "../app/globals.css";
import ClientProvider from "@/store/ClientProvider";
import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "Notes App",
  description: "App for notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          <main>{children}</main>
        </ClientProvider>
      </body>
    </html>
  );
}
