import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ProfileProvider } from "@/context/ProfileProvider";
import { AdminProvider } from "@/context/AdminProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Onboarding",
  description: "A coding assignment by Daniel Gazzola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AdminProvider>
          <ProfileProvider>
            {children}
          </ProfileProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
