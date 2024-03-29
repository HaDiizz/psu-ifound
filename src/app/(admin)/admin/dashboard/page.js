import dynamic from "next/dynamic";
const DisplayDashBoard = dynamic(() => import("@/components/dashboard/DisplayDashBoard"), {
  ssr: false,
});


const Page = () => {
  return (
    <div className="pb-5">
      <DisplayDashBoard />
    </div>
  );
};

export default Page;
