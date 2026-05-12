import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kost Groupe — L'immobilier neuf en Algérie, sans risque",
  description:
    "Promoteurs vérifiés. Permis contrôlés. Garanties affichées. Prix comparés au quartier. La transparence est notre standard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[--kost-paper] text-[--kost-ink]">
        {children}
      </body>
    </html>
  );
}
