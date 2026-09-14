import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/content";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jefferson Oliveira — Designer Gráfico",
  description:
    "Portfólio de Jefferson Oliveira, Designer Gráfico com experiência em marcas de hospitalidade e alto padrão.",
  openGraph: {
    title: "Jefferson Oliveira — Designer Gráfico",
    description:
      "Portfólio de Jefferson Oliveira, Designer Gráfico com experiência em marcas de hospitalidade e alto padrão.",
    images: ["/profile/jefferson.jpg"],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jefferson Oliveira — Designer Gráfico",
    description:
      "Portfólio de Jefferson Oliveira, Designer Gráfico com experiência em marcas de hospitalidade e alto padrão.",
    images: ["/profile/jefferson.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const profile = getProfile();
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg text-fg">
        <Header nome={profile.nome} />
        <main className="flex-1">{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
