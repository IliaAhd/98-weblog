import "98.css";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Container from "@/components/Container/Container";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { siteUrl } from "@/utils/site";

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
      <head>
        <meta
          name="google-site-verification"
          content="lYiZEcAi_DBkCSa1z6VG049H1Xz7xUdxDamnzU2UGPI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="98 Weblog - A simple retro blog platform built with Next.js and 98.css"
        />
        <meta property="og:title" content="98 Weblog" />
        <meta
          property="og:description"
          content="98 Weblog - A simple retro blog platform built with Next.js and 98.css"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:image" content={`${siteUrl}/favicon.ico`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="98 Weblog" />
        <meta
          name="twitter:description"
          content="98 Weblog - A simple retro blog platform built with Next.js and 98.css"
        />
        <meta name="twitter:image" content={`${siteUrl}/favicon.ico`} />
        <link rel="canonical" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
      </head>
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
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
