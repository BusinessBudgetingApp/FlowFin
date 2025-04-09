import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Update the path to the correct location of globals.css
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import logo from "../../../public/Logo2.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowFin",
  icons: {
    icon: "favicon.png",
  },
  description: "Aplikasi Keuangan ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
      <ToastContainer />
        <div className="min-w-screen container min-h-screen bg-gray-100 flex ">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
