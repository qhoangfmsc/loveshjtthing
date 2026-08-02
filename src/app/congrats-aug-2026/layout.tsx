import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🌸 Thiệp chúc mừng em - Global Fashion Week All Stars",
  description:
    "Một tấm thiệp nhỏ chúc mừng em đã tỏa sáng trọn vẹn ở Global Fashion Week All Stars 💐",
};

export default function CongratsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
