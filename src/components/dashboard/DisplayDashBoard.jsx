"use client";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import LatestTable from "./LatestTable";
import {
  useAdmins,
  useCountsByCampId,
  usePosts,
  useReports,
  useUsers,
} from "@/hooks/swr";
import StatCard from "./StatCard";

const DisplayDashBoard = () => {
  const { data: posts, isLoading: isPostsLoading } = usePosts(0);
  const { data: reports, isLoading: isReportLoading } = useReports(0);
  const { data: users } = useUsers();
  const { data: admins } = useAdmins();
  const { data: barChartData, isLoading: isBarChartDataLoading } =
    useCountsByCampId();

  return (
    <>
      <StatCard
        totalPost={posts?.count}
        totalReport={reports?.count}
        totalUser={users?.count}
        totalAdmin={admins?.count}
      />
      <div className="grid grid-cols-12 pt-[1.5rem] gap-4">
        <div className="md:col-span-8 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
          <BarChart
            data={barChartData?.result}
            isLoading={isBarChartDataLoading}
          />
        </div>
        <div className="md:col-span-4 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700">
          <PieChart
            totalPost={posts?.count}
            totalReport={reports?.count}
            isLoading={isPostsLoading || isReportLoading}
          />
        </div>
        <div className="lg:col-span-12 col-span-12 card p-5 border border-gray-200 rounded-lg shadow-md dark:bg-slate-800 dark:border-slate-700 flex">
          <LatestTable />
        </div>
      </div>
    </>
  );
};

export default DisplayDashBoard;
