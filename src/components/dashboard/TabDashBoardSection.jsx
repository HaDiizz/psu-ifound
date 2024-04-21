"use client";
import { useState } from "react";
import { Tabs, Tab, Spinner } from "@nextui-org/react";
import { usePosts, useReports } from "@/hooks/swr";
import DashBoardTable from "./DashBoardTable";

const TabDashBoardSection = () => {
  const [selected, setSelected] = useState("lost");
  const {
    data: postsData,
    isLoading: isPostLoading,
    mutate: postMutate,
  } = usePosts(0);
  const {
    data: reportsData,
    isLoading: isReportLoading,
    mutate: reportMutate,
  } = useReports(0);
  return (
    <Tabs
      color="default"
      selectedKey={selected}
      onSelectionChange={setSelected}
      aria-label="Tabs options"
    >
      <Tab key="lost" title="ประกาศหาของหาย">
        {isPostLoading ? (
          <div className="flex justify-center items-center pt-5">
            <Spinner label="Loading..." />
          </div>
        ) : (
          <DashBoardTable
            posts={postsData.posts || []}
            tableType={selected}
            mutate={postMutate}
          />
        )}
      </Tab>
      <Tab key="found" title="ประกาศเจอของหาย">
        {isReportLoading ? (
          <div className="flex justify-center items-center pt-5">
            <Spinner label="Loading..." />
          </div>
        ) : (
          <DashBoardTable
            posts={reportsData.reports || []}
            tableType={selected}
            mutate={reportMutate}
          />
        )}
      </Tab>
    </Tabs>
  );
};

export default TabDashBoardSection;
