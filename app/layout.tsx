import { Lato, Comfortaa } from "next/font/google";
import "./globals.css";
import "modern-normalize/modern-normalize.css";

const lato = Lato({
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
	variable: "--font-lato",
	display: "swap"
});

const comfortaa = Comfortaa({
	subsets: ["latin"],
	weight: ["700"],
	variable: "--font-comfortaa",
	display: "swap"
});

export default function RootLayout({
  children,
	modal
}: Readonly<{
  children: React.ReactNode,
	modal: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
				{children}
				{modal}
      </body>
    </html>
  );
}
