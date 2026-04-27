import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com"),
  title: {
    default: "James Rhyll & Algen Mary — Wedding Invitation",
    template: "%s — James Rhyll & Algen Mary",
  },
  description:
    "Join us for our wedding celebration. Find the details, explore photos, and RSVP.",
  openGraph: {
    title: "James Rhyll & Algen Mary — Wedding Invitation",
    description:
      "Join us for our wedding celebration. Find the details, explore photos, and RSVP.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory-50 text-ink-300 font-sans">
        {children}
      </body>
    </html>
  );
}
