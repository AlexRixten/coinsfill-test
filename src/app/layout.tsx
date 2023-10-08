import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/layouts/MainLayout/Header/Header";
import { Navbar } from "@/layouts/MainLayout/Navbar/Navbar";
import "./globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider, SWRProvider } from "@/components/Providers/Providers";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import AuthVerify from "@/utils/authVerify";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "СoinsFill",
  description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SessionProvider>
          <SWRProvider>
            <div className="min-h-full flex flex-col">
              <Header />
              <Breadcrumb
                homeElement={"Главная"}
                separator={<span> / </span>}
                activeClasses="underline"
                containerClasses="flex py-5 text-[#1E1E2E80] text-[10px]"
                listClasses="hover:underline mx-2 font-bold"
                capitalizeLinks
              />
              <main className="flex-1">{children}</main>
              <Navbar />
            </div>
            <ToastContainer />
            <AuthVerify />
          </SWRProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
