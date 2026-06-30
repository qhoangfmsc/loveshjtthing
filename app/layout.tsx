import type { Metadata, Viewport } from "next";
import { Dancing_Script, Quicksand } from "next/font/google";
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

export const metadata: Metadata = {
  title: "💖 Văn Kiều Bảo Trân 💖",
  description: "Trang dành riêng cho người con gái đặc biệt nhất",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💖</text></svg>",
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
      className={`${dancingScript.variable} ${quicksand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
