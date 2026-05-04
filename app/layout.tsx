import { Lato, Comfortaa } from "next/font/google";
import "./globals.css";
import "modern-normalize/modern-normalize.css";
import "modern-normalize";
import { AuthProvider } from "../components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
		  <body className={`${lato.variable} ${comfortaa.variable}`}>		
			  <TanStackProvider>
				  <AuthProvider>
            {children}
          </AuthProvider>
			  </TanStackProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}