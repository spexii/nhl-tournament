import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";

import Layout from "@/components/Layout";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ["latin"], variable: '--font-open-sans' });

export const metadata: Metadata = {
  title: "Shemale Cup",
  description: "Shemale Cup - NHL-pelisarjan turnaussivusto",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
