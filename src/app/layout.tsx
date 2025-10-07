import "98.css";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "98 Weblog",
  description:
    "98 Weblog - A simple retro blog platform built with Next.js and 98.css",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "100vh",
            }}
          >
            <div>
              <Navbar />
              <Container>
                <Breadcrumbs />
                <main>{children}</main>
              </Container>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
