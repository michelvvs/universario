import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Universário - O Que Acontecia no Dia em Que Você Nasceu?",
  description:
    "Descubra as músicas mais tocadas, notícias históricas, fase exata da lua, cinema e dados astronômicos do dia do seu nascimento em formato de stories do Instagram.",
  keywords: [
    "universario",
    "aniversario",
    "dia que nasci",
    "musicas que estavam em alta",
    "fase da lua",
    "stories instagram",
    "fatos historicos",
  ],
  authors: [{ name: "Universário" }],
  openGraph: {
    title: "Universário - Descubra o Dia em que Você Chegou ao Mundo",
    description:
      "Gere seus stories personalizados com as músicas, notícias e a fase da lua do dia do seu nascimento.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070913",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

