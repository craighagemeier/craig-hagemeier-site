import PageStructure from "./components/PageStructure";
import ThemeProvider from "./components/ThemeProvider";
import { Metadata } from "next";
import "./styles/global.scss";

export const metadata: Metadata = {
  title: "Craig Hagemeier | Exploring Ideas, Capturing Moments, Pushing Limits",
  description:
    "A journey through code, creativity, and adventure: racing through endurance events, capturing moments behind the lens, and exploring the world.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Craig Hagemeier | Exploring Ideas, Capturing Moments, Pushing Limits",
    description:
      "A journey through code, creativity, and adventure: racing through endurance events, capturing moments behind the lens, and exploring the world.",
    url: "https://craig.hagemeier.com",
    siteName: "Craig Hagemeier",
  },
  metadataBase: new URL("https://craig.hagemeier.com"),
  authors: [{ name: "Craig Hagemeier", url: "https://craig.hagemeier.com" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ThemeProvider>
          <PageStructure>{children}</PageStructure>
        </ThemeProvider>
      </body>
    </html>
  );
}
