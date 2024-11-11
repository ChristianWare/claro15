import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const lb = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--lb",
});

const pretendard = localFont({
  src: "../../public/fonts/Pretendard.woff2",
  variable: "--pretendard",
  display: "swap",
});

const pretendardMedium = localFont({
  src: "../../public/fonts/PretendardRegular.otf",
  variable: "--pretendardMedium",
  display: "swap",
});

const pretendardLight = localFont({
  src: "../../public/fonts/PretendardLight.woff2",
  variable: "--pretendardLight",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Claro",
    template: "%s - Claro",
  },
  description:
    "Our purpose is to redefine the way you experience sound. We are driven by a singular purpose: to elevate your world through the magic of exceptional audio.",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${pretendard.variable} ${lb.variable} ${pretendardMedium.variable} ${pretendardLight.variable}`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
