import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LabSim Merdeka — Simulasi Lab Virtual untuk SMA",
  description:
    "Platform simulasi laboratorium virtual interaktif untuk siswa SMA. Pelajari Fisika, Kimia, dan Biologi melalui eksperimen digital yang akurat dan menyenangkan.",
  keywords: ["simulasi lab", "SMA", "fisika", "kimia", "biologi", "virtual lab", "GEMASTIK"],
  openGraph: {
    title: "LabSim Merdeka",
    description: "Simulasi Lab Virtual untuk SMA — Fisika, Kimia, Biologi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
