import AdminSideBar from "@/components/layout/AdminSideBar";

export const metadata = {
  title: "Admin",
  robots: {
    index: false,
    nocache: true,
  },
};

export default async function RootLayout({ children }) {
  return (
    <>
      <AdminSideBar />
      <main className="container pt-[7rem]">{children}</main>
    </>
  );
}
