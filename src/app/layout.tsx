import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Dancing_Script,
  Quicksand,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dancing",
});

const quicksand = Quicksand({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

// Refined serif for letter-style body copy (small-caps labels, italic
// paragraphs) — pairs with the script/signature fonts for a "luxury
// stationery" letter look. See .agent/skills/design-style.md
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

// Signature font: reserved for proper nouns (names, event titles) and
// closing signatures — never for body copy. See .agent/skills/design-style.md
const brotherSignature = localFont({
  src: "../assets/Brother Signature.otf",
  display: "swap",
  variable: "--font-signature",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const title = "💖 Văn Kiều Bảo Trân 💖";
const description =
  "Anh tặng em, nhật ký viết về sự kiện đặc biệt trong hành trình yêu của chúng ta 💕";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/og-thumbnail.png",
        width: 1600,
        height: 900,
        alt: "Văn Kiều Bảo Trân",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-thumbnail.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a0022",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${dancingScript.variable} ${quicksand.variable} ${brotherSignature.variable} ${cormorantGaramond.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
