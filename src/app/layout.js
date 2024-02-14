import { Inter } from "next/font/google";
import { Suspense } from "react";
import Navbar from  "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fotomind",
  description: "Created by WebDev @ GT",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
            <section>
                <Suspense fallback={
                    <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center gap-8 justify-between h-[69px]" />
                  }>
                      <Navbar></Navbar>
                </Suspense>
            </section>
            <main>
                {children}
            </main>
      </body>
    </html>
  );
}