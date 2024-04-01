import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Providers from "@/providers/providers";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Toaster } from "react-hot-toast";
import ProgressLoader from "@/components/ProgressLoader";
import NextTopLoader from "nextjs-toploader";
const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PSU iFound",
  description: "The app that created by NEBULA team",
  icons: {
    icon: "./favicon.ico",
  },
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className={inter.className}>
        <ProgressLoader />
        <NextTopLoader showSpinner={false} color="#f564ce" />
        <div className="main">
          <div className="gradient"></div>
        </div>
        <Providers session={session}>
          <Navbar />
          <Toaster position="bottom-left" reverseOrder={false} />
          <main className="w-full min-h-screen overflow-hidden bg-cover bg-gradient-to-tr from-gray-100 to-indigo-50 dark:bg-gradient-to-tr dark:from-gray-900 dark:to-slate-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
