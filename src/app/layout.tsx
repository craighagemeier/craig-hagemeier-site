import PageStructure from "./components/PageStructure";
import ThemeProvider from "./components/ThemeProvider";
import { Metadata } from "next";
import "./styles/globals.css";

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
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <PageStructure>{children}</PageStructure>
        </ThemeProvider>
      </body>
    </html>
  );
}
