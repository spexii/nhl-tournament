import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import Layout from "@/components/Layout";
import { AuthProvider } from "@/lib/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shemale Cup",
  description: "Shemale Cup",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = headers();
  const authenticated = headerStore.get('X-User-Authenticated') === 'true';
  console.log('authenticated header', authenticated);
  const admin = headerStore.get('X-User-Admin') === 'true';
  console.log('admin header', admin);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider isAuthenticated={authenticated} isAdmin={admin}>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
