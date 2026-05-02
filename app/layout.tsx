import { Lato, Comfortaa } from "next/font/google";
import "./globals.css";
import "modern-normalize/modern-normalize.css";
import "modern-normalize";

const lato = Lato({
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
	variable: "--font-lato",
	display: "swap"
});

const comfortaa = Comfortaa({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-comfortaa",
	display: "swap"
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${lato.className} ${comfortaa.className}` }>
				{children}
      </body>
    </html>
  );
}
