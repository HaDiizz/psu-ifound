import dynamic from "next/dynamic";
import StatCard from "@/components/dashboard/StatCard";
import LatestFoundTable from "@/components/dashboard/LatestFoundTable";
const BarChart = dynamic(() => import("@/components/charts/BarChart"), {
  ssr: false,
});
const PieChart = dynamic(() => import("@/components/charts/PieChart"), {
  ssr: false,
});
const LineChart = dynamic(() => import("@/components/charts/LineChart"), {
  ssr: false,
});

const Page = () => {
  return (
    <div className="pb-5">
      <StatCard />
      <div className="grid grid-cols-12 pt-[1.5rem] gap-4">
        <div className="md:col-span-8 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
          <BarChart />
        </div>
        <div className="md:col-span-4 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
          <PieChart />
        </div>
        <div className="md:col-span-3 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700 flex justify-center items-center h-full">
          <LatestFoundTable />
        </div>
        <div className="md:col-span-3 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700 flex justify-center items-center h-full">
          <LatestFoundTable />
        </div>
        <div className="md:col-span-6 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Page;
