export const metadata = {
  title: "Craig Hagemeier | Exploring Ideas, Capturing Moments, Pushing Limits",
  description:
    "A journey through code, creativity, and endurance—capturing moments, building ideas, and exploring the world.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Craig Hagemeier | Exploring Ideas, Capturing Moments, Pushing Limits",
    description:
      "A journey through code, creativity, and endurance—capturing moments, building ideas, and exploring the world.",
    url: "https://craig.hagemeier.com",
    site_name: "Craig Hagemeier",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Craig Hagemeier" />
        <link rel="canonical" href="https://craig.hagemeier.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Craig Hagemeier | Exploring Ideas, Capturing Moments, Pushing Limits" />
        <meta property="og:description" content="A journey through code, creativity, and endurance—capturing moments, building ideas, and exploring the world." />
        <meta property="og:url" content="https://craig.hagemeier.com" />
        <meta property="og:site_name" content="Craig Hagemeier" />
      </head>
      <body>{children}</body>
    </html>
  );
}