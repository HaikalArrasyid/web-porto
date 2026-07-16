import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";
import TextType from "./components/typeeffect";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="relative bg-black text-white overflow-x-hidden">
      
<ConditionalNavbar />

  {/* LAYER BELAKANG */}
  <div className="fixed inset-0 -z-10">
    
    {/* GRID */}
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#140003",
        backgroundImage: `
          linear-gradient(to right, rgba(32,2, 5,1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(32,2,5,1) 1px, transparent 1px)
        `,
        backgroundSize: "23px 23px",
        zIndex: -10
      }}
    />
  </div>

  {children}

</body>
    </html>
  );
}
