import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Footer from "@/components/Footer/Footer";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

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
    default: "CHUXLY",
    template: "%s - Chuxly",
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
        className={`${pretendard.variable} ${pretendardMedium.variable} ${pretendardLight.variable}`}
      >
        {/* {children}
        <Footer /> */}
        <Head>
          <link
            rel='preload'
            as='image'
            href='/images/herov.jpg'
            type='image/webp'
            media='(max-width: 768px)'
          />
        </Head>
        <ReactQueryProvider>
          <Toaster
            position='top-center'
            toastOptions={{
              className: "toastFont",
              duration: 6000,
              style: {
                border: "2px solid #295f4e",
                borderRadius: "50px",
                textAlign: "center",
                whiteSpace: "nowrap",
              },
            }}
          />
          {children}
          {/* <Footer /> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
