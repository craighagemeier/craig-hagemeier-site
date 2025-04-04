import PageStructure from "./components/templates/PageStructure";
import ThemeProvider from "./components/providers/ThemeProvider";
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
    url: "https://craighagemeier.com",
    siteName: "Craig Hagemeier",
    images: [
      {
        url: "https://craighagemeier.com/images/Craig-Hagemeier.jpg",
        width: 714,
        height: 714,
        alt: "Craig Hagemeier - Exploring Ideas, Capturing Moments, Pushing Limits",
      },
    ],
  },
  metadataBase: new URL("https://craighagemeier.com"),
  authors: [{ name: "Craig Hagemeier", url: "https://craighagemeier.com" }],
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
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&family=Archivo+Black&family=Outfit:wght@300..900&family=Playfair+Display:wght@400;700&display=swap" as="style" />
      </head>
      <body>
        <ThemeProvider>
          <PageStructure>{children}</PageStructure>
        </ThemeProvider>
      </body>
    </html>
  );
}
