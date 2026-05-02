import { Lato, Comfortaa } from "next/font/google";
import "./globals.css";
import "modern-normalize/modern-normalize.css";
import "modern-normalize";
import { AuthProvider } from "./providers/AuthProvider";


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
	console.log("LAYOUT WORKING");
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} ${lato.className} ${comfortaa.className}` }> */}
		<body className={`${lato.className} ${comfortaa.className}`}>		
		  <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}