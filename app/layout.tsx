import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Client from "@/shared/layout/client";
import Navbar from "@/components/shared/navbar";
import Query from "@/components/shared/layout/query";
import { AuthProvider } from "@/components/shared/auth/auth-context";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My Own Boilerplate",
  description:
    "A custom Next.js boilerplate with modern tooling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} font-[family-name:var(--font-space-grotesk)] antialiased`}
      >
        <Query>
          <AuthProvider>
            <Client>
              <Navbar />
              {children}
            </Client>
          </AuthProvider>
        </Query>
      </body>
    </html>
  );
}
