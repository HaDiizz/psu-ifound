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
  manifest: "/manifest.webmanifest",
  metadataBase: new URL("https://psu-ifound.vercel.app"),
  title: {
    default: `PSU iFound`,
    template: `PSU iFound | %s`,
  },
  description:
    "Lost and Found Hub: Discover and announce lost items within all 5 campuses of Price of Songkla University. Connect with owners or finders. Your lost belongings might just find their way back to you",
  generator: "Next.js",
  applicationName: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Found",
    "Find",
    "PSU",
    "Prince of Songkla University",
    "Prince of Songkla University Hatyai Campus",
    "Prince of Songkla University Pattani Campus",
    "Prince of Songkla University Surat Thani Campus",
    "Prince of Songkla University Trang Campus",
    "Prince of Songkla University Phuket Campus",
    "Lost",
    "PSU student",
    "Campus",
    "หาของหายในมอ",
    "หาของหายในม.อ.",
    "เจอของในมอ",
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี",
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต",
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตตรัง",
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี",
    "เจอของหายในมหาลัย",
    "หาของหายในมหาลัย",
    "psu ifound",
    "PSU iFound",
    "PSU ifound",
    "PSU iFound",
    "psu ifound ของหายในมอ",
    "psu ifound เจอของในมอ",
    "psu หาของ",
  ],
  authors: [
    { name: "NEBULA" },
    { name: "NEBULA", url: "https://github.com/HaDiizz" },
  ],
  colorSchema: "Dark",
  creator: "NEBULA",
  publisher: "NEBULA Prince of Songkla",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "./favicon.ico",
  },
  openGraph: {
    title: "PSU iFound",
    description:
      "Lost and Found Hub: Discover and announce lost items within all 5 campuses of Price of Songkla University. Connect with owners or finders. Your lost belongings might just find their way back to you",
    images: [
      {
        url: "/logo-ifound.webp",
        width: 400,
        height: 300,
      },
    ],
  },
  verification: {
    google: "QB4p2TnjStku0tmNesYkGbbesYkOJotOg4oUbN7i5qo",
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
